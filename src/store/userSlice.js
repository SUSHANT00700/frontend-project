import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrUser: (state, action) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setCurrUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
