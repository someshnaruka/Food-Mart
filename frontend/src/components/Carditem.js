import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import GradeIcon from "@mui/icons-material/Grade";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { toast } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { IncreaseUnitRedux } from "../features/productSlice";
import { DecreaseUnitRedux } from "../features/productSlice";
import { useDispatch } from "react-redux";


const CardItem = (props) => {

    const dispatch=useDispatch();



  function handledelete(){
    props.ondelete(props.id)
  }

function handleimgClick()
{
  const product={
    id:props.id,
    unit:props.unit
  }
  props.onimg(product)
}


  return (
    <>
      <div className=" bg-white w-full m-2 mb-3 border-1 border-solid border-black rounded-sm flex flex-col md:flex-row shadow-lg">
        <div className=" overflow-hidden m-auto cursor-pointer" onClick={handleimgClick}>
          <img src={props.image}className=" w-24 h-24 object-cover "></img>
        </div>
        <div className=" bg-hero_brown md:w-3/4 h-full align-top flex flex-col items-start gap-3">
          <div className="flex justify-between w-full">
            <h1 className="md:text-3xl text-xl mx-2">{props.title}</h1>
            <p className="cursor-pointer p-1" onClick={handledelete}><DeleteIcon></DeleteIcon></p>

          </div>

          <div className="flex justify-start  items-end  mx-2 text-xl">
            <p className="text-lg md:text-xl">{props.quantity}</p>
            <div className="flex justify-center gap-1">
              <p className=" ml-3">
                <GradeIcon sx={{ color: "orange", fontSize: 30 }}></GradeIcon>
              </p>
              <p className="mt-0.5 text-lg md:text-xl">{props.rating}</p>
            </div>
          </div>
          <div className="flex justify-between w-7 items-start mx-1 text-xl">
            <p>
              <CurrencyRupeeIcon
                sx={{ color: "black", fontSize: 23 }}
              ></CurrencyRupeeIcon>
            </p>
            <p className=" text-lg  md:text-xl">{props.price}</p>
          </div>
          <div className="flex mx-1 h-10 w-full  gap-2 md:gap-4 items-center justify-between">
            <div className=" md:w-1/3 h-full flex items-center justify-start ">
              <p className="cursor-pointer mx-0 " onClick={()=>dispatch(DecreaseUnitRedux(props.id))}>
                <IndeterminateCheckBoxIcon
                  sx={{
                    color: "black",
                    "&:hover": { color: "grey" },
                    fontSize: 45,
                  }}
                ></IndeterminateCheckBoxIcon>
              </p>
              <input
                type="text"
                name="unit"
                value={props.unit}
                className="w-10 indent-3 p-1"
                readOnly
              ></input>
              <p className="cursor-pointer" onClick={()=>dispatch(IncreaseUnitRedux(props.id))}>
                <AddBoxIcon
                  sx={{
                    color: "black",
                    "&:hover": { color: "grey" },
                    fontSize: 45,
                  }}
                ></AddBoxIcon>
              </p>
            </div>
            <p className="mr-2 text-lg md:text-xl">Total:{props.total}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
