import React from "react";
import Header from './Header';
import Footer from "./Footer";


const Layout=({children})=>{

    return (
<>
<div className="wrraper">
<Header></Header>
{children}
<Footer></Footer>
</div>

</>

    );

};

export default Layout

