import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// const state = { userId: null }; //agr reducer bnaer only userReducre
// const state = { user: { userId: null }, ticker: { userId: null } };

const rootReducer = combineReducers({
  user: userReducer,
  ticket: userReducer,
});
// const globalState = {userId}
// const globalState = {user : globalState,
// ticket:globalState}

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
