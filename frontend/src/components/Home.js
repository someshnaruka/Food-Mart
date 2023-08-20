import React, { useEffect, useRef, useState } from "react";
import HeroSection from "./HeroSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Categorycard from "./Categorycard";
import OwlCarouselSection from "./OwlcarouselSection";
import Tailwindslider from "./Tailwindslider";
import { useDispatch, useSelector } from "react-redux";
import Cardslider from "./Cardslider";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { AddcartRedux } from "../features/productSlice";

import { RotatingLines } from 'react-loader-spinner';
const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  console.log(productData,"Product Data");

const [isLoading,setLoading]=useState(true);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_DOMAIN + "/category")
      .then((resData) => {
        setCategoryData(resData.data.categoryResult);
        setLoading(false)
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  }, []);



  const loadingArray = new Array(4).fill(null);

  function handleclick(title) {
    navigate("/productpage/" + title);
  }
 const slideProduct=useRef();

  function nextSlide(){
   slideProduct.current.scrollLeft += 300;
  }
  function prevSlide(){
    slideProduct.current.scrollLeft -= 300;
  }
  function handleProduct(product) {
    dispatch(AddcartRedux(product));
  }
  function handleProductclick(productUnit) {
    navigate("/productdetail/" + productUnit.id + "/" + productUnit.unit);
  }
  return (
    <>
    {
      isLoading ?<div className="w-full h-screen flex justify-center items-center"> <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>:
    
    <div className="flex flex-col  ">
    <HeroSection></HeroSection>

<div className="my-10  mx-6">
     <h1 className="text-md md:text-2xl">Shop By Category</h1>
     <hr className="border-1 border-black border-solid"></hr>
     <div className="category-box flex items-center justify-between my-5 w-full flex-wrap">
       {categoryData.map((post) => {
         return (
           <Categorycard
             key={post._id}
             title={post.title}
             image={post.image}
             onclick={handleclick}
           ></Categorycard>
         );
       })}
     </div>
   </div>

  

   <div className="my-5 w-[95%] mx-6 ">
     <h1 className="text-md md:text-2xl">Products</h1>
     <hr className="border-1 border-black border-solid"></hr>
     <div className="my-5 flex justify-end gap-2 items-center">
       <button onClick={prevSlide}>
         <NavigateBeforeIcon
           sx={{ fontSize: 30 }}
           className="bg-slate-300 hover:bg-yellow-300 border rounded-lg" 
         ></NavigateBeforeIcon>
       </button>
       <button onClick={nextSlide}>
         <NavigateNextIcon
           sx={{ fontSize: 30 }}
           className="bg-slate-300 hover:bg-yellow-300 border rounded-lg"
         ></NavigateNextIcon>
       </button>
     </div>

     <div className="flex md:h-full h-80 gap-5 my-5 w-full overflow-scroll  no-scrollbar scroll-smooth transition-all" ref={slideProduct}>
       {productData &&
          productData.map((post, index) => {
             return (
               <Cardslider
                 key={index}
                 id={post._id}
                 title={post.title}
                 image={post.image}
                 rating={post.rating}
                 price={post.price}
                 quantity={post.quantity}
                 onclick={handleProductclick}
                 oncart={handleProduct}
               ></Cardslider>
             );
           })
          
       }
     </div>
   </div>
    </div>
    }
    </>
  );
};

export default Home;
