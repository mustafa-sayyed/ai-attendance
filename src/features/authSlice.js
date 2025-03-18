import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  roles: [],
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.roles = action.payload.roles;
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = {};
      state.roles = [];
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
