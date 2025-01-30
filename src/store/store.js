import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import inputBoxSlice from "../features/input-box/inputBoxSlice";

export const store = configureStore({
  reducer: {
    hero: findPlaceSlice,
    inputBox: inputBoxSlice,
  },
});
