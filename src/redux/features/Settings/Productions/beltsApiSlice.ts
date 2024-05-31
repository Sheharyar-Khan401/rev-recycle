import { apiSlice } from "redux/api/apiSlice";
import { Belt } from "redux/types/Settings/Productions/belt";

export const beltsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Belt"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetBelts: builder.query<Array<Belt>, null>({
        query: () => ({ url: "belt" }),
        providesTags: ["Belt"],
        transformResponse: (result: {
          payLoad: Array<Belt>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addBelts: builder.mutation({
        query: (body) => ({
          url: "/belt",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Belt"],
      }),
    }),
  });
export const { useAddBeltsMutation, useGetBeltsQuery } = beltsApiSlice;
