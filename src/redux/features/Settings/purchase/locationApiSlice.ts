import { apiSlice } from "redux/api/apiSlice";
import {
  Location,
  LocationRequest,
} from "redux/types/Settings/Purchase/location";

export const locationApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Location"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetLocation: builder.query<Array<Location>, null>({
        query: () => ({ url: "location" }),
        providesTags: ["Location"],
        transformResponse: (result: {
          payLoad: Array<Location>;
          message: string;
        }) => {
          return result?.payLoad ? result?.payLoad : [];
        },
      }),
      addLocation: builder.mutation({
        query: (body: LocationRequest[]) => ({
          url: "/location",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Location"],
      }),
    }),
  });
export const { useAddLocationMutation, useGetLocationQuery } = locationApiSlice;
