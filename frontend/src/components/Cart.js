import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "./Carditem";
import { DeletecartRedux } from "../features/productSlice";
import emptyCart from "../Assests/foodmart/empty cart.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

const Cart = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.cartList);
  const user = useSelector((state) => state.user);
  console.log(user,"cart user info");
  console.log(productData, "cart data");

  const totalSum = productData.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalItem = productData.reduce(
    (acc, curr) => acc + parseInt(curr.unit),
    0
  );
  function handleDelete(id) {
    console.log(id, "delete id");
    dispatch(DeletecartRedux(id));
  }
  function handleImgClick(product) {
    navigate("/productdetail/" + product.id + "/" + product.unit);
  }

 async function handlePayment() {
  if(user.email)
  {

  
    
      axios
        .post(
          process.env.REACT_APP_SERVER_DOMAIN + "/create-checkout-session",
          {
            productData,
            userID: user._id,
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.url) {
            toast("Redirecting to Payment Gateway")
            window.location.href = response.data.url;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
      else{
        toast("Login to complete payment")
        setTimeout(()=>{
          navigate("/login")
        },1000)
      }
  }

  return (
    <>
      {productData[0] ? (
        <>
          <div className="p-2 md:p-4">
            <h1 className="text-lg md:text-4xl">Your Cart Items</h1>
            <div className="flex flex-col-reverse md:flex-row justify-between">
              <div className="p-2 md:p-4 w-full h-full md:w-3/4">
                {productData.map((post, index) => {
                  return (
                    <CardItem
                      key={index}
                      id={post.id}
                      title={post.title}
                      image={post.image}
                      rating={post.rating}
                      price={post.price}
                      quantity={post.quantity}
                      unit={post.unit}
                      total={post.total}
                      ondelete={handleDelete}
                      onimg={handleImgClick}
                    ></CardItem>
                  );
                })}
              </div>
              <div className="bg-slate-100 m-2 md:mt-6 text-left   h-40 w-full md:w-1/4 flex flex-col justify-between border-1 border-black rounded-md shadow-lg">
                <div className="border-b-2">
                  {" "}
                  <h2 className="text-lg md:text-3xl">Cart Summary:</h2>
                </div>

                <div className="flex w-full border-b-2 ">
                  <p className="text-md md:text-2xl">Total Items:</p>
                  <p className="ml-2 text-md md:text-2xl">{totalItem}</p>
                </div>
                <div className="flex w-full border-b-2">
                  <p className="text-md md:text-2xl">Total Amount:</p>
                  <p className="ml-2 text-md md:text-2xl">₹ {totalSum}</p>
                </div>

                <div
                  className="flex justify-center items-baseline  border-3 border-black rounded-md border-solid cursor-pointer  bg-yellow-400 hover:bg-yellow-200"
                  onClick={handlePayment}
                >
                  <p className="text-lg text-center p-2 md:text-2xl w-full">
                    Check Out
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <img src={emptyCart} className="w-full max-w-sm"></img>
        </div>
      )}
    </>
  );
};

export default Cart;
