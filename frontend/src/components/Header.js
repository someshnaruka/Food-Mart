import React, { useEffect, useRef, useState } from "react";
import logo from "../Assests/foodmart/logo.svg";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { logoutRedux } from "../features/user/userSlice";
import { toast } from "react-hot-toast";
import axios from "axios";


const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemNumber = useSelector((state) => state.product.cartList);
  
  const [show, setShow] = useState(false);

  const [searchText, setSearchtext] = useState("");
  const showDropdown = (e) => {
    setShow(!show);
  };

  function handleLogout() {
    dispatch(logoutRedux());
    localStorage.removeItem('token');
    axios.get(process.env.REACT_APP_SERVER_DOMAIN + "/logout",{withCredentials:true}).then(()=>{
      console.log("Logout Succesfull");
    }).catch((err)=>{
      console.log(err);
    })
    localStorage.removeItem("FoodMartcart")
    toast("Logout Succefull");
    navigate("/");
    window.location.reload();
  }

function handleCart(){
  navigate("/cart");
}


  const userData = useSelector((state) => state.user);
  console.log("====================================");
  console.log(userData, "Login data");
  console.log("====================================");
  console.log(process.env.REACT_APP_ADMIN_EMAIL, "admin email");

  return (
    <>
      <div className=" md:m-8 ">
        <div className="nav flex flex-col items-center justify-center w-full  ">
          <div className="nav-content flex justify-between items-center  w-full h-full">
            <div className="w-1/3 h-full">
              <Link to={"/"}>
                <img src={logo} alt="Logo" className="logo object-cover"></img>
              </Link>
            </div>

            <div className="menu-section w-1/3 justify-between  mx-auto hidden md:flex">
              <Link to={"/"} className="text-xl md:text-2xl">
                Home
              </Link>

              <Link to={"/about"} className="text-xl md:text-2xl">
                About
              </Link>

              <Link to={"/contact"} className="text-xl md:text-2xl">
                Contact us
              </Link>
            </div>

            <div className="menu-item flex justify-center md:gap-4 gap-2 items-center cursor-pointer" >
              
                <div className=" inline-flex relative m-3" onClick={handleCart}>
                  <LocalMallOutlinedIcon
                    className="cart-logo cursor-pointer "
                    sx={{ fontSize: 40 }}
                  />
                  <div className="absolute -top-1 -right-1.5 m-0  bg-yellow-400 text-normal h-6 w-6 rounded-full  text-[#202020] text-center">
                    {cartItemNumber.length}
                  </div>
                </div>
              <div
                className="text-black w-15 h-15"
                onClick={showDropdown}
                // onMouseLeave={hideDropdown}
              >
                {userData.profilePic ? (
                  <div className="cursor-pointer h-10 w-10 rounded-full overflow-hidden drop-shadow-md">
                    <img
                      src={userData.profilePic}
                      className="h-full w-full cursor-pointer"
                    ></img>
                  </div>
                ) : (
                  <AccountCircleIcon
                    sx={{ color: "black", fontSize: 50 }}
                    className="cursor-pointer"
                  ></AccountCircleIcon>
                )}
                {/* <button className="bg-[#202020] hover:bg-[#FC8019] text-[#FDFBFA] hover:text-[#202020] text-xs py-1 px-3 border rounded-full">
                Sign In
              </button> */}

                {show && (
                  <div className=" absolute right-2 bg-white py-2 z-10 shadow drop-shadow-md flex flex-col justify-center items-center min-w-[120px] px-1">
                    {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                      <Link
                        to={"newProduct"}
                        className="whitespace-nowrap cursor-pointer text-md md:text-xl py-1 text-slate-500
                 hover:text-black"
                      >
                        {" "}
                        New product
                      </Link>
                    )}
                    {userData.profilePic ? (
                      <p
                        className="whitespace-nowrap cursor-pointer text-md md:text-xl  text-slate-500
                 hover:text-black"
                        onClick={handleLogout}
                      >
                        Logout
                      </p>
                    ) : (
                      <p
                        onClick={()=>navigate('login')}
                        className="whitespace-nowrap cursor-pointer flex items-center justify-center text-md md:text-xl text-slate-500
                 hover:text-black "
                      >
                        Login
                      </p>
                    )}
                    <div className="menu-section w-1/3 justify-between  text-left  mx-auto flex flex-col items-center md:hidden">
                      <Link
                        to={"/"}
                        className="text-md text-slate-500
                 hover:text-black"
                      >
                        Home
                      </Link>

                      <Link
                        to={"/about"}
                        className="text-md text-slate-500
                 hover:text-black"
                      >
                        About
                      </Link>

                      <Link
                        to={"/contact"}
                        className="text-md text-slate-500
                 hover:text-black"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Header;
