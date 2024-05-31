import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "redux/types/Settings/user";

export interface initialStateType {
  token: string;
  credentials: { email: string; password: string } | null;
  user: UserData | null;
}
const initialState: initialStateType = {
  token: "",
  credentials: null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ email: string; password: string } | null>
    ) => {
      state.credentials = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      state.token = token;
    },
    logOut: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const { setAuthToken, setCredentials, setUser, logOut } =
  authSlice.actions;

export default authSlice.reducer;
