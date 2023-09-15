import React, { useState } from "react";
import GradeIcon from "@mui/icons-material/Grade";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-hot-toast";
import { AddcartRedux } from "../features/productSlice";
import { useDispatch } from "react-redux";

const Productcard = (props) => {
  const dispatch = useDispatch();

  const [unitCounter, setunitCounter] = useState(0);

  function increaseUnit() {
    if (unitCounter < 10) {
      setunitCounter(unitCounter + 1);
    } else {
      toast("Max limit reached");
    }
  }

  function decreaseUnit() {
    if (unitCounter != 0) {
      setunitCounter(unitCounter - 1);
    }
  }
  function handleclick() {
    const productUnit={
      id:props.id,
      unit:unitCounter
    }
    props.onclick(productUnit);
  }
  function handleCart() {
    if(unitCounter===0)
    {
      toast("Minimun Quantity 1")
    }
    else
    {
    const productdetail = {
      id: props.id,
      title: props.title,
      image: props.image,
      rating: props.rating,
      price: props.price,
      quantity: props.quantity,
      unit: unitCounter,
      total:"0"
    };
    props.oncart(productdetail)
  }
  }

  return (
    <>
      <div className="product-card  min-w-[300px] max-w-[400px] h-full bg-white flex flex-col border-1 rounded-xl border-solid cursor-pointer  hover:scale-105 transition-all overflow-hidden shadow-xl justify-evenly items-start p-2">
        {props.title ? (
          <>
            <div
              className="bg-slate-100 h-40 w-full border-1 rounded-md p-1 border-solid flex justify-center "
              onClick={handleclick}
            >
              <img src={props.image} className="bg-cover bg-center  "></img>
            </div>
            <p className="mx-2 my-1 text-xl md:text-2xl text-orange-600 whitespace-nowrap">{props.title}</p>
            <div className="flex justify-start gap-2 w-full items-start mx-2">
              <p className="text-lg font-normal text-slate-400 whitespace-nowrap">
                {props.quantity}
              </p>
              <p className="text-md ">
                <GradeIcon sx={{ color: "orange", fontSize: 25 }}></GradeIcon>
              </p>
              <p className="text-lg font-normal">{props.rating}</p>
            </div>
            <div className="flex justify-start w-7 items-start mx-2">
              <p className="mb-3">
                <CurrencyRupeeIcon
                  sx={{ color: "black", fontSize: 20 }}
                ></CurrencyRupeeIcon>
              </p>
              <p className="text-lg font-normal">{props.price}</p>
            </div>
            <div className="flex mb-2 mx-2 h-6 w-full justify-start items-baseline ">
              <div className=" w-1/3 h-full flex ">
                <button
                  className="border-1 border-black border-solid rounded-sm bg-slate-200  h-full w-5 text-middle p-1 text-xs font-normal"
                  onClick={decreaseUnit}
                >
                  -
                </button>
                <input
                  type="text"
                  name="unit"
                  value={unitCounter}
                  className="w-5 mx-2"
                  readOnly
                ></input>
                <button
                  className="border-1 border-black border-solid rounded-sm bg-gray-300  h-full w-5 text-middle p-1  text-xs font-normal"
                  onClick={increaseUnit}
                >
                  +
                </button>
              </div>
              <div
                className="flex justify-between items-baseline border-1 rounded-md border-solid cursor-pointer bg-yellow-400 hover:bg-yellow-200"
                onClick={handleCart}
              >
                <p className="text-md font-normal mx-1 p-1">Add to cart</p>
                <p className="p-1">
                  <AddShoppingCartIcon
                    sx={{ color: "black", fontSize: 20 }}
                  ></AddShoppingCartIcon>
                </p>
              </div>
             
            </div>
           
          </>
        ) : (
          <div className="flex justify-center items-center  min-h-[200px]">
            <p>{props.loading}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Productcard;
