import React, { useEffect, useState } from "react";



const Categorycard = (props) => {

  function handleCategory(){
    props.onclick(props.title)
  }
  return (
      <>
      <div className="category-btn category-cards flex flex-col justify-center items-center text-center p-9 bg-hero_brown w-full md:w-1/6 drop-shadow-xl cursor-pointer border border-2  rounded-2xl my-5 hover:scale-105 transition-all overflow-hidden" onClick={handleCategory}>
        <img src={props.image}></img>
        <p className="text-md md:text-xl w-full">{props.title}</p>
      </div>
      </>
  );
};

export default Categorycard;
