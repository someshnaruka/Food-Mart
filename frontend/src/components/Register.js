import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import userImg from "../Assests/user.png";
import { ImgtoBase64 } from "../utility/ImgtoBase64";
import { toast } from "react-hot-toast";

const Register = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });


const [show,setShow]=useState(false);
  const [showPassword, setPassword] = useState(false);

  function passwordVisible() {
    return setPassword(!showPassword);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  async function handleUpload(event) {
  

    const data = await ImgtoBase64(event.target.files[0]);


    setUser((prevValue) => {
      return {
        ...prevValue,
        profilePic: data,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setShow(true);
    const { firstName, email, password, confirmPassword ,profilePic } = user;
    if (firstName && email && password && confirmPassword && profilePic) {
      if (password === confirmPassword) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/register`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        await response
          .json()
          .then((dataRes) => {
            if (dataRes == null) {
            
            }
               else {
                toast(dataRes.message);
                if (dataRes.alert) {
                  setShow(false);
                  navigate("/login");
                }
                
              }
            }
          )
          .catch((err) => {
            console.log(err);
          });

        // alert(dataRes.message);
      } else {
        alert("password does not match");
      }
    } else {
      alert("All fields are mandatory to Fill");
    }
 
  }

  return (
    <>
    <div className="flex justify-center">
      <div className="border-1 shadow-lg  bg-hero_Blue  w-full md:w-1/3 m-4 ">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between items-start p-2 md:p-4 ">
          <div className="w-24 h-24  overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
            <img
              src={user.profilePic ? user.profilePic : userImg}
              alt="Profile Pic"
              className="w-full h-full "
            ></img>
            <label htmlFor="profileImg">
              <div className="absolute bottom-0 h-1/4 right-1 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                <p className="text-sm text-white">Upload</p>
              </div>
              <input
                type={"file"}
                id="profileImg"
                accept="image/*"
                className="invisible "
                onChange={handleUpload}
              ></input>
            </label>
          </div>
          <div className="User-Name w-full">
            <input
              type="text"
              placeholder="First Name"
              id="name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="text-lg w-full md:text-xl mb-4 mt-4 border-2 border-white rounded-lg p-2 bg-hero_Blue"
            ></input>

            <input
              type="text"
              placeholder="Last Name"
              id="name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="text-lg w-full md:text-xl mb-4 border-2 border-white rounded-lg p-2 bg-hero_Blue"
            ></input>
          </div>

          <input
            type="text"
            placeholder="Email or Phone"
            id="username"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="text-lg w-full md:text-xl mb-4 border-2 border-white rounded-lg p-2 bg-hero_Blue"
          ></input>
<div className="w-full relative">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="text-lg w-full md:text-xl mb-4 border-2 border-white rounded-lg p-2 bg-hero_Blue"
          ></input>
          <div className="visiblity-icon cursor-pointer absolute top-19 right-3 z-10 p-2">
            <span onClick={passwordVisible}>
              {showPassword ? (
                <VisibilityIcon
                  sx={{ fontSize:25}}
                  
                />
              ) : (
                <VisibilityOffIcon
                  fontSize="small"
                  className="visiblityIcon cursor-pointer"
                />
              )}
            </span>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            id="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            className="text-lg w-full md:text-xl mb-4 border-2 border-white rounded-lg p-2 bg-hero_Blue"
          ></input>
          </div>
          {
            show ?   <button className="login-btn border border-2 border-white hover:bg-hero_green flex justify-center p-2 rounded-lg w-full text-xl md:text-2xl bg-hero_brown mb-4 shadow-md" disabled>
            Signing Up...
          </button> :    <button className="login-btn border border-2 border-white hover:bg-hero_green flex justify-center p-2 rounded-lg w-full text-xl md:text-2xl bg-hero_brown mb-4 shadow-md">
            Sign Up
          </button>
          }
      
          <p className="new-user text-lg md:text-xl text-center w-full mb-4">
            Alredy Registered?{" "}
            <a
              href="/login"
              className="new-user text-lg md:text-xl text-center w-full hover:text-slate-500"
              style={{  textDecoration: "underline" }}
            >
              Login
            </a>
          </p>
          <div className="social flex w-full justify-evenly items-center">
            <div className="go cursor-pointer bg-red-600 rounded-lg hover:bg-red-400">
            <p className="text-white text-lg md:text-xl p-3 px-5"><GoogleIcon sx={{fontSize:20}}></GoogleIcon> Google</p> 
            </div>
            <div className="fb cursor-pointer border-1 rounded-lg bg-blue-900 hover:bg-blue-800">
              <p className="text-white p-3 text-lg md:text-xl"><FacebookIcon></FacebookIcon> Facebook </p> 
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
