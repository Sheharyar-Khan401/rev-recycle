import { configureStore } from "@reduxjs/toolkit";
import authReducer from "redux/features/auth/authSlice";
import { apiSlice } from "redux/api/apiSlice";
import commonSlice from "redux/features/common/commonSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose a storage method here

// Create a persist config for the authReducer
const authPersistConfig = {
  key: "root",
  storage,
};

// Wrap the authReducer with redux-persist
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Use the persisted authReducer
    common: commonSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // systemsetup: invoiceTypeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      apiSlice.middleware,
    ]),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
