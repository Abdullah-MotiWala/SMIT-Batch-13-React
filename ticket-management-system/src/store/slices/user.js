import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.userId = payload;
    },
    logoutUser: (state) => {
      state.userId = null;
    },
  },
});

// userSlice = {
//   actions: { loginUser: Function, logoutUser: Function },
//   reducer: () => {},
// };
export const { loginUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
