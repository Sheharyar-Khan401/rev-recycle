import { apiSlice } from "redux/api/apiSlice";
import { CartonsData } from "redux/types/Settings/Productions/carton";
export const cartonsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Cartons"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      //defining the get end point ,  result type Array of Cartons
      GetCartons: builder.query<Array<CartonsData>, null>({
        query: () => ({ url: "carton" }),
        providesTags: ["Cartons"],
        transformResponse: (result: {
          payLoad: Array<CartonsData>;
          message: string;
        }) => {
          return result ? result?.payLoad : [];
        },
      }),
      addCartons: builder.mutation({
        query: (body) => ({
          url: "/carton",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Cartons"],
      }),
    }),
  });

export const { useAddCartonsMutation, useGetCartonsQuery } = cartonsApiSlice;
