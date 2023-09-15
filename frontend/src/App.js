import React, { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import toast, { Toaster } from "react-hot-toast";
import NewProduct from "./components/NewProduct";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  AddcartRedux,
  productCheck,
  productRedux,
} from "./features/productSlice";

// import Productpage from "./components/Productpage";
import Productdetail from "./components/Productdetail";
import Cart from "./components/Cart";
import Searchpage from "./components/Searchpage";
import Footer from "./components/Footer";

// import Home from "./components/Home";
import Layout from "./components/Layout";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import { loginRedux } from "./features/user/userSlice";
import { decodeToken } from "react-jwt";
const LazyProductdetail=React.lazy(()=>import ("./components/Productdetail"));
const LazyProductpage=React.lazy(()=>import ("./components/Productpage"));
const LazyHome=React.lazy(()=>import ("./components/Home"));
function App() {
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;
  const [check, setcheck] = useState(true);
  useEffect(() => {
    let products = [];
    if (localStorage.getItem("FoodMartcart")) {
      products = JSON.parse(localStorage.getItem("FoodMartcart"));
      dispatch(productCheck(check));
    } else {
      setcheck(false);
      dispatch(productCheck(check));
    }
  
    {
      products.forEach((product) => {
        dispatch(AddcartRedux(product));
      });
    }
  }, []);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_DOMAIN + "/auth/user", {
        withCredentials: true,
      })
      .then((datares) => {
        
        if (datares.data.result) {
          dispatch(loginRedux(datares.data.result));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDetail = decodeToken(token);
   
      dispatch(loginRedux(userDetail));
    } else {
      console.log("invalid token");
    }
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_DOMAIN + "/newProduct")
      .then((data) => {
       

        dispatch(productRedux(data.data.dataRes));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main overflow-x-hidden">
    <ChakraProvider>
      <Toaster></Toaster>
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<React.Suspense><LazyHome /></React.Suspense>}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            exact
            path="/newProduct"
            element={<NewProduct></NewProduct>}
          ></Route>
          <Route
            exact
            path="/productpage/:title"
            element={<React.Suspense><LazyProductpage></LazyProductpage></React.Suspense>}
          ></Route>
          <Route
            exact
            path="/productdetail/:id/:unit"
            element={<React.Suspense><LazyProductdetail></LazyProductdetail></React.Suspense>}
          ></Route>
          <Route exact path="/cart" element={<Cart></Cart>}></Route>
          <Route
            exact
            path="/search/:searchText"
            element={<Searchpage></Searchpage>}
          ></Route>
          <Route exact path="/success" element={<Success></Success>}></Route>
          <Route exact path="/cancel" element={<Cancel></Cancel>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
