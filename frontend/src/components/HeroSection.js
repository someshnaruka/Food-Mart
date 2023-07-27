import smoothi from "../Assests/foodmart/Image 1.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Categorycard from "./Categorycard";
import { useEffect, useState } from "react";
import axios from "axios";
import Productcard from "./Productcard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import OwlCarouselSection from "./OwlcarouselSection";

const Hero_Section = () => {
  const navigate = useNavigate();

  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  console.log(width, "screen");
  function handleClick() {
    navigate("/search/" + searchText);
  }
  function handleSearch(event) {
    const { name, value } = event.target;
    setSearchtext(value);
  }

  const [searchText, setSearchtext] = useState("");

  return (
    <div>
      <div className="search-panel w-full flex mt-5 justify-center items-center bg-yellow-300">
        <input
          className="search-bar text-xs md:text-md md:p-3 p-2  md:m-5 mt-5 ml-5 mb-5  w-3/4 md:w-1/3 placeholder-black border-2 border-white outline-0 bg-yellow-300 rounded-lg"
          type="text"
          name="searchValue"
          value={searchText}
          placeholder="Search from a variety of products."
          onChange={handleSearch}
        ></input>
        {width < 800 ? (
          <div
            className="absolute right-12 cursor-pointer"
            onClick={handleClick}
          >
            <SearchIcon></SearchIcon>
          </div>
        ) : (
          <div className="border border-2 border-black rounded-lg bg-black hover:bg-slate-300 ">
            {" "}
            <button
              className="searchButton text-white text-xs md:text-xl hover:text-black p-1.5 overflow-hidden shadow drop-shadow-lg"
              onClick={handleClick}
            >
              Search Product
            </button>
          </div>
        )}
      </div>
      <div className="hero-section bg-cover w-full ">
        {width > 800 ? (
          <div className="flex justify-evenly items-center">
            <div className="hero-content-card m-2  md:m-8 flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden bg-hero_Blue border border-1 shadow drop-shadow-xl rounded-lg w-1/2">
              <div className="content m-2 md:m-12 flex flex-col w-3/4 md:w-1/2 justify-between">
                <h2 className="text-md md:text-3xl mb-2 text-yellow-500">
                  100% Natural
                </h2>
                <h1 className="text-xl md:text-4xl mb-2 font-semibold">
                  Fresh Smoothie & Beverages
                </h1>
                <p className="text-sm md:text-2xl mb-2">
                  Best selling summer juice with natural extracts.
                </p>
                <button className="heroSection_shopButton text-md md:text-lg p-2 md:p-4 border border-2  w-full md:w-1/2 border-black rounded-lg hover:bg-black hover:text-white">
                  Shop Now
                </button>
              </div>
              <div className="smoothie-img ">
                <img src={smoothi} className="objext-cover h-72  md:h-96"></img>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-1/4 m-2 md:m-8 overflow-hidden h-full ">
              <div className="veggie bg-no-repeat bg-cover flex justify-between flex-col md:flex-row items-center overflow-hidden bg-hero_green border border-1 shadow drop-shadow-xl rounded-lg  md:p-7 w-full m-auto">
                <div className="flex flex-col w-full  md:pt-10 md:pb-10 md:pr-10 justify-between items-start gap-2">
                  <h1 className="text-md md:text-xl mb-2 font-semibold">
                    Fruits & Vegetables
                  </h1>
                  <p className="text-sm md:text-md cursor-pointer hover:text-yellow-500">
                    Shop The Category{" "}
                    <ArrowForwardIcon sx={{ fontSize: 15 }}></ArrowForwardIcon>{" "}
                  </p>
                </div>
              </div>
              <div className="bakery bg-no-repeat bg-cover flex justify-between flex-col mt-2 md:flex-row items-center overflow-hidden bg-hero_brown border border-1 shadow drop-shadow-xl rounded-lg md:p-7 w-full">
                <div className="flex flex-col w-full  md:pt-10 md:pb-10 md:pr-10 justify-between items-start gap-2">
                  <h1 className="text-md md:text-xl mb-2 font-semibold">
                    Baked Products
                  </h1>
                  <p className="text-sm md:text-md cursor-pointer hover:text-yellow-500">
                    Shop The Category{" "}
                    <ArrowForwardIcon sx={{ fontSize: 15 }}></ArrowForwardIcon>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div ><OwlCarouselSection></OwlCarouselSection></div>
          
        )}
      </div>{" "}
    </div>
  );
};

export default Hero_Section;
