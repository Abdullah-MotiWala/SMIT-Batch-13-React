import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.userId = payload;
    },
  },
});

export const { loginUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
