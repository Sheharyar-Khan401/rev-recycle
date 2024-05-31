import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  successMessage: "",
  errorMessage: "",
};
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage, setSuccessMessage } = commonSlice.actions;

export default commonSlice.reducer;
