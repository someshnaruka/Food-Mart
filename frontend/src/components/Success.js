import React, { useEffect } from "react";

const Success=(props)=>{

    useEffect(()=>{
        localStorage.removeItem("FoodMartcart");
    },[])
    return(
<>
<div className="bg-green-500 m-auto flex justify-center items-center w-3/4 h-28 ">
<h1 className="text-xl">Payment Sucessfull</h1>
</div>

</>


    );
};

export default Success;