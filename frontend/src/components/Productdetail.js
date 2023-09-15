import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GradeIcon from "@mui/icons-material/Grade";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { toast } from "react-hot-toast";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { AddcartRedux } from "../features/productSlice";

const Productdetail = (props) => {
  const { id, unit } = useParams();
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  const [unitCounter, setunitCounter] = useState(unit);

  function increaseUnit(event) {
    if (unitCounter < 10) {
      setunitCounter(Number(unitCounter) + 1);
    } else {
      toast("Max limit reached");
    }
  }

  function decreaseUnit() {
    if (unitCounter != 0) {
      setunitCounter(Number(unitCounter) - 1);
    }
  }

  const filterdata = productData.filter((data) => {
    return data._id === id;
  });

  function handleProduct() {
    if (unitCounter>0) {
      const productdetail = {
        id: filterdata[0]._id,
        title: filterdata[0].title,
        image: filterdata[0].image,
        rating: filterdata[0].rating,
        price: filterdata[0].price,
        quantity: filterdata[0].quantity,
        unit: unitCounter,
        total: "0",
      };
      dispatch(AddcartRedux(productdetail));
      
    } else {
      
      toast("Minimum Quntity 1");
    }
  }
  function handleBuy(){
    if (unitCounter>0) {
      const productdetail = {
        id: filterdata[0]._id,
        title: filterdata[0].title,
        image: filterdata[0].image,
        rating: filterdata[0].rating,
        price: filterdata[0].price,
        quantity: filterdata[0].quantity,
        unit: unitCounter,
        total: "0",
      };
      dispatch(AddcartRedux(productdetail));
      navigate("/cart");
      
      
    } else {
     
      toast("Minimum Quntity 1");
    }
  }
 

  return (
    <div>
      {filterdata[0] ? (
        <>
          <div className=" p:2 md:p-4 overflow-x-hidden  no-scrollbar">
            <div className="md:flex-row flex-col flex w-full max-w-4xl m-auto bg-hero_brown shadow-lg drop-shadow-md">
              <div className="bg-hero_green max-w-lg shadow overflow-hidden text-center md:flex items-center">
                <img
                  src={filterdata[0].image}
                  className="min-h-40 w-full h-80 hover:scale-105 transition-all m-auto "
                ></img>
              </div>
              <div className=" bg-hero_brown md:w-3/4 w-full  flex flex-col gap-6 items-start">
                <h1 className="md:text-4xl text-xl font-semibold mx-2">
                  {filterdata[0].title}
                </h1>

                <p className="md:text-md text-sm mx-2">
                  {filterdata[0].description}
                </p>
                <div className="flex justify-center items-center  mx-2 ">
                  <p className="text-xl">{filterdata[0].quantity}</p>
                  <div className="flex justify-center gap-1">
                    <p className=" ml-3 flex justify-center items-center">
                      <GradeIcon
                        sx={{ color: "orange", fontSize: 25 }}
                      ></GradeIcon>
                    </p>
                    <p className=" text-2xl justify-start items-start">
                      {filterdata[0].rating}
                    </p>
                  </div>
                </div>
                <div className="flex justify-start w-full items-start mx-1">
                  <p>
                    <CurrencyRupeeIcon
                      sx={{ color: "black", fontSize: 25 }}
                    ></CurrencyRupeeIcon>
                  </p>
                  <p className=" text-xl">{filterdata[0].price}</p>
                </div>
                <div className="flex mx-1 h-10 w-full md:w-3/4 gap-2 md:gap-4 items-center ">
                  <div className=" md:w-1/3 h-full flex items-center justify-start ">
                    <p className="cursor-pointer mx-0 " onClick={decreaseUnit}>
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
                      value={unitCounter}
                      className="w-8 indent-3 text-lg"
                      readOnly
                    ></input>
                    <p className="cursor-pointer" onClick={increaseUnit}>
                      <AddBoxIcon
                        sx={{
                          color: "black",
                          "&:hover": { color: "grey" },
                          fontSize: 45,
                        }}
                      ></AddBoxIcon>
                    </p>
                  </div>
                  <div className="flex justify-center items-center border-3 border-black rounded-md border-solid cursor-pointer bg-yellow-400 hover:bg-yellow-200" onClick={handleProduct}>
                    <p
                      className="text-lg md:text-2xl mx-1"
                      
                    >
                      Add to cart
                    </p>
                  </div>
                  <div className="flex justify-center items-center border-3 border-black rounded-md border-solid cursor-pointer  bg-yellow-400 hover:bg-yellow-200" onClick={handleBuy}>
                    <p className="text-lg md:text-2xl mx-1">Buy Now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white w-20 h-40 "></div>
        </>
      )}
    </div>
  );
};

export default Productdetail;
