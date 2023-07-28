import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import toast, { Toaster } from "react-hot-toast";
import NewProduct from "./components/NewProduct";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddcartRedux, productCheck, productRedux } from "./features/productSlice";
import Productpage from "./components/Productpage";
import Productdetail from "./components/Productdetail";
import Cart from "./components/Cart";
import Searchpage from "./components/Searchpage";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import { loginRedux } from "./features/user/userSlice";
import { decodeToken } from "react-jwt";

function App() {
  const dispatch = useDispatch();



  axios.defaults.withCredentials = true;
const [check,setcheck]=useState(true)
  useEffect(()=>{
    let products = [];
    if(localStorage.getItem('FoodMartcart')){
        products = JSON.parse(localStorage.getItem('FoodMartcart'));
        dispatch(productCheck(check))
    }
    else{
      setcheck(false)
      dispatch(productCheck(check))
    }
    console.log(products);
    {products.forEach((product)=>{
      dispatch(AddcartRedux(product))
    })}
  },[])
  useEffect(()=>{
    axios.get(process.env.REACT_APP_SERVER_DOMAIN + "/auth/user",{withCredentials:true}).then((datares)=>{
      console.log(datares.data,"google data");
      if(datares.data.result)
      {
       
        dispatch(loginRedux(datares.data.result))
      }

    }).catch((err)=>{
      console.log(err);
    })
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDetail=decodeToken(token);
          console.log(userDetail,"login data");
          dispatch(loginRedux(userDetail))
    }
    else{
      console.log("invalid token");
    }
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_DOMAIN + "/newProduct")
      .then((data) => {
        console.log(data.data.dataRes, "category data");

        dispatch(productRedux(data.data.dataRes));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main">
      <Toaster></Toaster>
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
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
            element={<Productpage></Productpage>}
          ></Route>
          <Route
            exact
            path="/productdetail/:id/:unit"
            element={<Productdetail></Productdetail>}
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
    </div>
  );
}

export default App;
