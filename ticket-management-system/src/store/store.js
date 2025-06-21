import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user";

const rootReducer = combineReducers({
  user: userReducer,
  ticket: userReducer,
});
// const globalState = {userId}
// const globalState = {user : globalState,
// ticket:globalState}

const store = configureStore({
  reducer: rootReducer,
});

export default store;
