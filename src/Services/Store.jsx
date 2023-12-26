import { configureStore } from "@reduxjs/toolkit";
import UserSlicerReducer from "./UserSlice";
import CartSliceReduser from "./CartSlice";

const store = configureStore({
  reducer: {
    user: UserSlicerReducer,
    cart: CartSliceReduser,
  },
});

export default store;
