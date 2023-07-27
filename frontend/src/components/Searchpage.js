import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Productcard from "./Productcard";
import noProduct from "../Assests/foodmart/no-product-found.png"
import { AddcartRedux } from "../features/productSlice";
import { useDispatch} from "react-redux";


const Searchpage=(props)=>{
    const dispatch=useDispatch();
  const navigate = useNavigate();
    const cartItemNumber=useSelector((state)=>state.product.productList)
    console.log(cartItemNumber,"search page cart product list");


    const {searchText}=useParams();


        const filterdata=cartItemNumber.filter((item)=>{
        
            return ( 
                item.title.toLowerCase().includes(searchText.toLowerCase()) || item.category.toLowerCase().includes(searchText.toLowerCase())
            )
        });

    console.log('====================================');
    console.log(filterdata,"search item result");
    console.log('====================================');
    
    function handleclick(productUnit) {
        navigate("/productdetail/" + productUnit.id+"/"+productUnit.unit);
      }
      function handleProduct(product){
        dispatch(AddcartRedux(product));
    
    
      }



    return (




        <>
<div className="m-2 md:m-12">
    <h1>Search Results</h1>
    <hr></hr>
    <div className="flex items-center justify-start my-8 h-full gap-30 w-full flex-wrap">
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
            : <div className="flex justify-center items-start w-full">

                <img src={noProduct}></img>
            </div>}
        </div>
</div>

        </>
    );
};

export default Searchpage;