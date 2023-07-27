import React from "react";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import GppGoodIcon from "@mui/icons-material/GppGood";
import VerifiedIcon from "@mui/icons-material/Verified";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import logo from "../Assests/foodmart/logo.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = (props) => {
  return (
    
      <div className="footer bg-hero_Blue flex flex-col  w-full justify-between items-end  overflow-hidden  mt-auto pt-10 ">
        <div className="flex  items-start  justify-evenly ">
          <div className="flex justify-center item-start w-1/6 ">
            <p className="pr-2">
              <DeliveryDiningIcon sx={{ fontSize: 25 }}></DeliveryDiningIcon>
            </p>

            <div className="flex flex-col w-auto">
              <p className="font-semibold text-xs">Free Delivery</p>
              <p className="text-xs hidden md:block font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-center item-center w-1/6">
            <p className="pr-2">
              <GppGoodIcon sx={{ fontSize: 25 }}></GppGoodIcon>
            </p>

            <div className="flex flex-col">
              <p className="font-semibold text-xs">100% Secure Payment</p>
              <p className="w-full text-xs hidden md:block font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-center item-start w-1/6">
            <p className="pr-2">
              <VerifiedIcon sx={{ fontSize: 25 }}></VerifiedIcon>
            </p>

            <div className="flex flex-col">
              <p className="font-semibold text-xs">Quality Assurance</p>
              <p className="w-full text-xs hidden md:block font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-center item-start w-1/6">
            <p className="pr-2">
              <CurrencyRupeeIcon sx={{ fontSize: 25 }}></CurrencyRupeeIcon>
            </p>

            <div className="flex flex-col">
              <p className="font-semibold text-xs">Guaranteed Savings</p>
              <p className="w-full text-xs hidden md:block font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-center item-start w-1/6">
            <p className="pr-2">
              <LocalOfferIcon sx={{ fontSize: 25 }}></LocalOfferIcon>
            </p>

            <div className="flex flex-col">
              <p className="font-semibold text-xs">Daily Offers</p>
              <p className="w-full text-xs hidden md:block font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex-row flex-col-reverse flex   items-center md:items-start  mx-2 md:mx-2 mt-10 md:mt-20">
          <div className="flex flex-col justify-between item-center m-10">
            <img src={logo} ></img>
            <div className="flex justify-evenly items-center mt-4">
              <p className="p-1 border-2 shadow-md drop-shadow-md rounded-md m-2 cursor-pointer">
                <FacebookIcon sx={{color:"grey","&:hover": { color: "black" }}}></FacebookIcon>
              </p>
              <p className="p-1 border-2 shadow-md drop-shadow-md rounded-md m-2 cursor-pointer">
                {" "}
                <TwitterIcon sx={{color:"grey","&:hover": { color: "black" }}}></TwitterIcon>
              </p>
              <p className="p-1 border-2 shadow-md drop-shadow-md rounded-md m-2 cursor-pointer">
                <InstagramIcon sx={{color:"grey", "&:hover": { color: "black" }}}></InstagramIcon>
              </p>
            </div>
          </div>
          <div className="flex justify-start items-start w-full ">
            <div className="md:flex flex-col hidden justify-between items-center p-2 w-1/4 m-10">
              <h2 className="font-semibold">Quick Links</h2>
              <p className="text-slate-400 text-md">Home</p>
              <p className="text-slate-400 text-md">About Us</p>
              <p className="text-slate-400 text-md">Offers</p>
              <p className="text-slate-400 text-md">Services</p>
              <p className="text-slate-400 text-md">Contacts</p>
              
            </div>
            <div className="md:flex flex-col hidden justify-between items-center p-2 m-10 w-1/4">
              <h2 className="font-semibold">About</h2>
              <p className="text-slate-400 text-md">How it Works?</p>
              <p className="text-slate-400 text-md">Our Package</p>
              <p className="text-slate-400 text-md">Refer a Friend</p>
              
            </div>
            <div className="md:flex flex-col hidden justify-between items-center p-2 m-10 w-1/4">
              <h2 className="font-semibold">Help Center</h2>
              <p className="text-slate-400 text-md">Payment</p>
              <p className="text-slate-400 text-md">Shipping</p>
              <p className="text-slate-400 text-md">Product Return</p>
              
              
            </div>
            <div className="flex flex-col justify-between items-center p-2 m-5 md:m-10 md:w-1/4 w-full">
              <h2 className="font-semibold">Our Newsetter</h2>
              <p className="text-slate-400 text-md">Subscribe to our newsletter to get updates about our grand offers.</p>
              <div className="flex justify-center items-center m-10">
                <input type="text" placeholder="Enter your email address" className="p-2 bg-slate-200"></input>
                <button className="bg-black p-2 text-white">Send</button>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Footer;
