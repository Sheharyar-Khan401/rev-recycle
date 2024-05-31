import { apiSlice } from "redux/api/apiSlice";
import { Floors } from "redux/types/common/floor";

export const floorApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Floors"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetFloors: builder.query<Array<Floors>, null>({
        query: () => ({
          url: "floor",
        }),
        providesTags: ["Floors"],
        transformResponse: (result: {
          payLoad: Array<Floors>;
          message: string;
        }) => {
          return result?.payLoad ? result?.payLoad : [];
        },
      }),
      addFloors: builder.mutation({
        query: (body) => ({
          url: "/floor",
          method: "POST",
          body: body,
        }),

        invalidatesTags: ["Floors"],
      }),
    }),
  });

export const { useAddFloorsMutation, useGetFloorsQuery } = floorApiSlice;
