import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFullScreen: false,
  value: '',
  valueKey: '',
  isAirport: false
};

export const inputBoxSlice = createSlice({
  name: "input-box",
  initialState,
  reducers: {
    openFullScreen: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    closeFullScreen: () => {
      return {
        ...initialState,
      };
    },
    setInputSelectedValue: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { openFullScreen, closeFullScreen, setInputSelectedValue } = inputBoxSlice.actions;
export default inputBoxSlice.reducer;
