import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.min.css"
import Productcard from "./Productcard";
import { useSelector } from "react-redux";
import Cardslider from "./Cardslider";
import smoothi from "../Assests/foodmart/Image 1.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const OwlCarouselSection = (props) => {
  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 6000,
    smartSpeed: 450,
    nav: true,
  };

  return (
    <>
      <div className="container-fluid">
        <OwlCarousel className="owl-theme" items={1} margin={4} center={true}  smartSpeed= {450} autoplay={true} dots={true}>
          <div className="">
            <div className="hero-content-card flex flex-col-reverse items-center justify-between overflow-hidden bg-hero_Blue border border-1 shadow drop-shadow-xl rounded-lg h-80 mt-3 w-full ">
              <div className="content m-2  flex flex-col w-full justify-between">
                <h2 className="text-md md:text-3xl mb-2 text-yellow-500">
                  100% Natural
                </h2>
                <h1 className="text-xl md:text-4xl mb-2 font-semibold">
                  Fresh Smoothie & Beverages
                </h1>
                <p className="text-sm md:text-2xl mb-2">
                  Best selling summer juice with natural extracts.
                </p>
                <button className="heroSection_shopButton text-md md:text-lg p-2  m-auto border border-2  w-1/2 border-black rounded-lg hover:bg-black hover:text-white">
                  Shop Now
                </button>
              </div>
              <div className="smoothie-img ">
                <img src={smoothi} className="objext-cover h-40"></img>
              </div>
            </div>
          </div>
          <div>
            <div className="veggie bg-no-repeat bg-cover flex justify-start flex-col items-center overflow-hidden bg-hero_green border border-1 shadow drop-shadow-xl rounded-lg w-full h-80">
              <div className="flex flex-col w-full justify-between items-start gap-2 m-auto">
                <h1 className="text-2xl text-left mb-2 font-semibold">
                  Fruits & Vegetables
                </h1>
                <p className="text-2xl cursor-pointer hover:text-yellow-500">
                  Shop The Category{" "}
                  <ArrowForwardIcon sx={{ fontSize: 20 }}></ArrowForwardIcon>{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
      
            <div className="bakery bg-no-repeat bg-cover flex justify-between flex-col mt-2 md:flex-row items-center overflow-hidden bg-hero_brown border border-1 shadow drop-shadow-xl rounded-lg h-80 w-full">
              <div className="flex flex-col w-full justify-between items-start gap-2 m-auto">
                <h1 className="text-2xl mb-2 font-semibold">
                  Baked Products
                </h1>
                <p className="text-xl cursor-pointer hover:text-yellow-500">
                  Shop The Category{" "}
                  <ArrowForwardIcon sx={{ fontSize: 20 }}></ArrowForwardIcon>{" "}
                </p>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </>
  );
};

export default OwlCarouselSection;
