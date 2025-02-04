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
    closeFullScreen: (state) => {
      return {
        ...initialState,
        isAirport: state.isAirport
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
