import React, { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ImgtoBase64 } from "../utility/ImgtoBase64";
import axios from "axios";
import { toast } from "react-hot-toast";

const NewProduct = (props) => {
  const [categoryData, setcategoryData] = useState({
    title: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    rating:"",
  });

  const [showImage,setshowImage]=useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setcategoryData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  const [file, setfile] = useState("");
  async function handleUploadimage(event) {
    const picture=await ImgtoBase64(event.target.files[0]);
setshowImage(picture);

    const data = event.target.files[0];
    setfile(data);
  }

  console.log("====================================");
  console.log(categoryData, "data to be uploaded");
  console.log("====================================");
  console.log(showImage,"image url");
  function handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append("title", categoryData.title);
    formData.append("category", categoryData.category);
    formData.append("price", categoryData.price);
    formData.append("quantity", categoryData.quantity);
    formData.append("rating", categoryData.rating);
    formData.append("description", categoryData.description);
 
    formData.append("image", file);
    console.log(formData, "form data");
    const { title, category, price, quantity, description,rating } = categoryData;
    const config = {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (title && category && price && quantity && description && rating) {
      axios
        .post(process.env.REACT_APP_SERVER_DOMAIN + "/newProduct", formData)
        .then((response) => {
          console.log(response.data);
          toast(response.data.message);
          if (response.data.alert) {
            setcategoryData({
              title: "",
              category: "",
              price: "",
              quantity: "",
              description: "",
              rating:"",
            });
            setshowImage("")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Update all the fields");
    }
  }
  return (
    <div className="p-4">
      <form
        className="bg-white m-auto w-full max-w-md shadow flex flex-col p-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-black">
          Name
        </label>
        <input
          type="text"
          name="title"
          value={categoryData.title}
          className="border bg-slate-200 p-1 my-1"
          onChange={handleChange}
        ></input>
        <label htmlFor="category" className="text-black">
          Category
        </label>
        <select
          className="border text-black bg-slate-200 p-1 my-1 "
          name="category"
          id="category"
          value={categoryData.category}
          onChange={handleChange}
        >
          <option className="text-black hidden">Select a category</option>
          <option className="text-black">Fruits & Veges</option>
          <option className="text-black">Beverages</option>
          <option className="text-black">Breads & Sweets</option>
          <option className="text-black">Oil & Ghee</option>
          <option className="text-black">Natural Herbs</option>
        </select>
        <label htmlFor="image" className="text-black">
          Image
          <div className="h-40 bg-slate-300 w-full rounded my-3 flex items-center justify-center cursor-pointer">
            {showImage ? (
              <img src={showImage} className=" h-full cover"></img>
            ) : (
              <FileUploadIcon
                sx={{ color: "black", fontSize: 50 }}
                className=""
              ></FileUploadIcon>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleUploadimage}
          
              className="hidden"
            ></input>
          </div>
        </label>

        <label htmlFor="price" className="text-black">
          Price
        </label>
        <input
          type="text"
          className="border bg-slate-200 p-1 my-1"
          name="price"
          value={categoryData.price}
          onChange={handleChange}
        ></input>
        <label htmlFor="quantity" className="text-black">
          Quantity
        </label>
        <input
          type="text"
          className="border bg-slate-200 p-1 my-1"
          name="quantity"
          value={categoryData.quantity}
          onChange={handleChange}
        ></input>
        <label htmlFor="rating" className="text-black">
          Rating
        </label>
        <input
          type="text"
          className="border bg-slate-200 p-1 my-1"
          name="rating"
          value={categoryData.rating}
          onChange={handleChange}
        ></input>

        <label htmlFor="description" className="text-black">
          Description
        </label>
        <textarea
          rows={3}
          className="border bg-slate-200 p-1 my-1 resize-none"
          name="description"
          value={categoryData.description}
          onChange={handleChange}
        ></textarea>
        <button className="bg-slate-700 hover:bg-slate-500 text-white text-m font-medium drop-shadow my-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
