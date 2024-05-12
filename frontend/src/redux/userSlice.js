import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // email: "",
  // firstName: "",
  // image: "",
  // lastName: "",
  // _id: "",
  type:"",
  userdetail:{},
  sellerdetail:{},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.userdetail=action.payload;
    },
    logoutRedux: (state, action) => {
      state.userdetail={};
      state.sellerdetail={};
    },
    sellerRedux:(state,action)=>{
      state.sellerdetail=action.payload;
    }
  },
});

export const { loginRedux ,logoutRedux,sellerRedux} = userSlice.actions;

export default userSlice.reducer;

