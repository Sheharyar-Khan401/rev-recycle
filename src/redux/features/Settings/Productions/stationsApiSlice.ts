import { apiSlice } from "redux/api/apiSlice";
import { StationsData } from "redux/types/Settings/Productions/station";

export const stationsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Stations"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetStations: builder.query<Array<StationsData>, null>({
        query: () => ({ url: "station" }),
        providesTags: ["Stations"],
        transformResponse: (result: {
          payLoad: Array<StationsData>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      getAllStations: builder.query<Array<StationsData>, null>({
        query: () => ({
          url: `/station`,
        }),
        providesTags: ["Stations"],
        transformResponse: (result: {
          payLoad: Array<StationsData>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addStations: builder.mutation({
        query: (body) => ({
          url: "/station",
          method: "POST",
          body: body,
        }),
        //refetching list
        invalidatesTags: ["Stations"],
      }),
    }),
  });

// Hooks to fetch data directly from the API
export const {
  useAddStationsMutation,
  useGetStationsQuery,
  useGetAllStationsQuery,
} = stationsApiSlice;
