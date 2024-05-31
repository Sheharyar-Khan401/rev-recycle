import { apiSlice } from "redux/api/apiSlice";
import { Port, PortRequest } from "redux/types/Settings/Purchase/port";

export const portApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Port"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPorts: builder.query<Array<Port>, null>({
        query: () => ({ url: "port" }),
        providesTags: ["Port"],
        transformResponse: (result: {
          payLoad: Array<Port>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addPort: builder.mutation({
        query: (data: PortRequest[]) => ({
          url: "/port",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Port"],
      }),
    }),
  });

export const { useAddPortMutation, useGetPortsQuery } = portApiSlice;
