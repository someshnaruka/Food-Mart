import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginRedux } from "../features/user/userSlice";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";

const Login = (props) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const userData=useSelector(state=>state)
 
  
  const dispatch=useDispatch();
const [show,setShow]=useState(false);
  const [user, setuser] = useState({
  username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setuser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleGoogle(){
    window.open(process.env.REACT_APP_SERVER_DOMAIN+"/auth/google","_parent","width=500,height=600")
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setShow(true);
    const { username, password } = user;

    if (username && password) {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      return await response.json().then((datares) => {
        toast(datares.message);


        if (datares.alert) {
          localStorage.setItem('token',datares.result)
          const userDetail=decodeToken(datares.result);
      
          dispatch(loginRedux(userDetail))
          setShow(false)
          // setTimeout(() => {
            
          // }, 1000);
          navigate("/");
        }
       

      });
    } else {
      alert("enter details");
    }
  }

  return (
    <>
    <div className="flex justify-center items-start w-full ">
      <div className="login-form border-1 shadow-lg  bg-hero_Blue  w-full md:w-1/3 m-4">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between items-start p-2 md:p-4 ">
          <h3 className="text-xl md:text-3xl text-center w-full p-2 mb-4 border-b-2 border-white">Login Here</h3>

          <label htmlFor="username" className="text-lg md:text-xl mb-2">Username</label>
          <input
            type="text"
            placeholder="Email or Phone"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange} className="text-lg w-full md:text-xl mb-4 border-2 border-white rounded-lg p-2 bg-hero_Blue"
          ></input>

          <label htmlFor="password" className="text-lg md:text-xl mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="text-lg w-full md:text-xl mb-4 border-2 border-white rounded-lg p-2 bg-hero_Blue"
          ></input>
{
  show ? <button className="login-btn border-2 border-white hover:bg-hero_green flex justify-center p-2 rounded-lg w-full text-xl md:text-2xl bg-hero_brown mb-4 shadow-md" disabled>
            Loging In...
          </button> :<button className="login-btn border-2 border-white hover:bg-hero_green flex justify-center p-2 rounded-lg w-full text-xl md:text-2xl bg-hero_brown mb-4 shadow-md">
            Log In
          </button>
}
          
          <p className="new-user text-lg md:text-xl text-center w-full mb-4">
            New User?{" "}
            <span
              onClick={()=>navigate("/register")}
              className="new-user text-lg md:text-xl  w-full hover:text-slate-500 cursor-pointer"
              style={{ textDecoration: "underline" }}
            >
              Register
            </span>
          </p>
          <div className="social flex w-full justify-evenly items-center">
            <div className="go cursor-pointer bg-red-600 rounded-lg hover:bg-red-400" onClick={handleGoogle}>
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

export default Login;
