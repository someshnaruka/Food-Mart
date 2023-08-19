import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "../features/user/userSlice";
import productSliceReducer from "../features/productSlice"
export const store= configureStore({
    reducer: {
        user:userSliceReducer,
        product:productSliceReducer,
    },
  });
