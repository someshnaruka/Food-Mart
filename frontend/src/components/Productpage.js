import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Productcard from "./Productcard";
import { AddcartRedux } from "../features/productSlice";

const Productpage = (props) => {
    const dispatch=useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.productList);

  const { title } = useParams();

    const filterdata=productData.filter((data) => {
      return data.category === title;
    },[]);



  const loadingArray = new Array(6).fill(null);

  function handleclick(productUnit) {
    navigate("/productdetail/" + productUnit.id+"/"+productUnit.unit);
  }
  function handleProduct(product){
    dispatch(AddcartRedux(product));


  }

  return (
    <>
  
      <div className="my-5 md:mx-12 mx-5 h-full">
        <h1 className="text-md md:text-2xl">{title}</h1>
        <hr className="border-1 border-black border-solid"></hr>
        <div className="flex items-center justify-start gap-5 my-8  w-full flex-wrap">
          {filterdata[0]
            ? filterdata.map((post, index) => {
                return (
                  <Productcard
                    key={index}
                    id={post._id}
                    title={post.title}
                    image={post.image}
                    rating={post.rating}
                    price={post.price}
                    quantity={post.quantity}
                    onclick={handleclick}
                    oncart={handleProduct}
                  ></Productcard>
                );
              })
            : loadingArray.map((post, index) => {
                return (
                  <Productcard key={index} loading={"loading..."}></Productcard>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Productpage;
