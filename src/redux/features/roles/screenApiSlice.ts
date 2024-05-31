import { apiSlice } from "redux/api/apiSlice";
import { Screen } from "redux/types/Settings/role";

export const screenApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Screen"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getScreen: builder.query<Array<Screen>, null>({
        query: () => ({ url: "screen" }),
        transformResponse: (result: {
          payLoad: Array<Screen>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });

export const { useGetScreenQuery } = screenApiSlice;
