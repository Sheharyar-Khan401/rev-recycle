import { apiSlice } from "redux/api/apiSlice";
import { CustomerData } from "redux/types/common/customer";

export const customerApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Customer"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      //defining the get end point ,  result type Array of Cartons
      GetCustomers: builder.query<Array<CustomerData>, null>({
        query: () => ({ url: "customer" }),
        providesTags: ["Customer"],
        transformResponse: (result: {
          payLoad: Array<CustomerData>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addCartons: builder.mutation({
        query: (body) => ({
          url: "/carton",
          method: "POST",
          body: body,
        }),
        //refetching list
        invalidatesTags: ["Customer"],
      }),
    }),
  });

// Hooks to fetch data directly from the API
export const { useAddCartonsMutation, useGetCustomersQuery } = customerApiSlice;
