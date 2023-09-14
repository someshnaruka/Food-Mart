import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    _id:"",
    firstName: "",
    lastName: "",
    email: "",
    profilePic: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
  
      //   state.user = action.payload.data;
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.username;
      state.profilePic = action.payload.profilePic;
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
      state.profilePic = "";
    },
  },
});

export const { loginRedux ,logoutRedux} = userSlice.actions;
export default userSlice.reducer;