import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartList: [],
  cartCheck:[],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productCheck:(state,action)=>{

state.productCheck=action.payload
    },
    productRedux: (state, action) => {
    
      state.productList = [...action.payload];
    },
    AddcartRedux: (state, action) => {
      const check = state.cartList.some(
        (item) => item.id === action.payload.id
      );
      if (check) {
        toast("Product already in cart");
      } else {
      
        const price = action.payload.price;
        const qty = action.payload.unit;
        const totalValue = price * qty;
        action.payload.total = totalValue;
        state.cartList.push(action.payload);
        toast("Product added to cart");
        
      }
      localStorage.setItem("FoodMartcart", JSON.stringify(state.cartList));
    },
    DeletecartRedux: (state, action) => {
   

      const index = state.cartList.findIndex(
        (item) => item.id === action.payload
      );
      state.cartList.splice(index, 1);
      localStorage.setItem("FoodMartcart", JSON.stringify(state.cartList));
    },
    IncreaseUnitRedux: (state, action) => {
      const index = state.cartList.findIndex(
        (item) => item.id === action.payload
      );
      let qty = state.cartList[index].unit;
      if (qty < 10) {
        let incqty = ++qty;
        state.cartList[index].unit = incqty;

        const price = state.cartList[index].price;
        const total = price * incqty;

        state.cartList[index].total = total;
      } else {
        toast("Max limit reached");
      }
      localStorage.setItem("FoodMartcart", JSON.stringify(state.cartList));
    },
    DecreaseUnitRedux: (state, action) => {
      const index = state.cartList.findIndex(
        (item) => item.id === action.payload
      );
      let qty = state.cartList[index].unit;
      if (qty > 1) {
        let decqty = --qty;
        state.cartList[index].unit = decqty;
        const price = state.cartList[index].price;
        const total = price * decqty;
        state.cartList[index].total = total;
      }
      localStorage.setItem("FoodMartcart", JSON.stringify(state.cartList));
    },
  },
});

export const {
  productRedux,
  AddcartRedux,
  DeletecartRedux,
  IncreaseUnitRedux,
  DecreaseUnitRedux,
  productCheck,
} = productSlice.actions;
export default productSlice.reducer;
