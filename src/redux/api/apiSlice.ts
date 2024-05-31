import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config";
import { globalVariables } from "helper/globalVariables";
import { logOut, setAuthToken } from "redux/features/auth/authSlice";
import { RootState } from "redux/store";
import {
  setErrorMessage,
  setSuccessMessage,
} from "redux/features/common/commonSlice";
import { PayloadType } from "redux/types/common/types";

const baseQuery = fetchBaseQuery({
  baseUrl,
  mode: "cors",
  credentials: "same-origin",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const { data, error } = result as {
    data: PayloadType<null>;
    error: FetchBaseQueryError | undefined;
  };

  if (!data && !error) {
    api.dispatch(setErrorMessage(globalVariables.ErrorMessage));
  } else if (data) {
    api.dispatch(setAuthToken(data.jwt));
    if (data.status && data.status !== "SUCCESS") {
      api.dispatch(setErrorMessage(data.message));
      if (data?.errorCode === 401) {
        api.dispatch(logOut);
      }
    } else if (typeof args === "object") {
      if (
        args.method === "DELETE" ||
        args.method === "POST" ||
        args.method === "PATCH" ||
        args.method === "PUT"
      ) {
        if (!(args.url === "/auth/login" || args.url === "/codes/code"))
          api.dispatch(setSuccessMessage(data.message));
      }
    }
  } else {
    if ((error?.data as { message: string }).message)
      api.dispatch(
        setErrorMessage((error?.data as { message: string }).message)
      );
    else api.dispatch(setErrorMessage(globalVariables.ErrorMessage));
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
