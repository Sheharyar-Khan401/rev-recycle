import { apiSlice } from "redux/api/apiSlice";
import { SortedRoomsData } from "redux/types/Settings/Productions/sortedroom";

export const sortedroomsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["SortedRooms"] })
  .injectEndpoints({
    //function with builder argument, returning 2 end points
    endpoints: (builder) => ({
      //defining the get end point
      GetSortedRooms: builder.query<Array<SortedRoomsData>, null>({
        query: () => ({ url: "sortedRoom" }),
        providesTags: ["SortedRooms"],
        transformResponse: (result: {
          payLoad: Array<SortedRoomsData>;
          message: string;
        }) => {
          return result?.payLoad ? result?.payLoad : [];
        },
      }),
      addSortedRooms: builder.mutation({
        query: (body) => ({
          url: "/sortedRoom",
          method: "POST",
          body: body,
        }),

        //refetching the list of rooms from (GetSortedRooms) once the data has  been added
        invalidatesTags: ["SortedRooms"],
      }),
    }),
  });

// Hooks to fetch data directly from the API
export const { useAddSortedRoomsMutation, useGetSortedRoomsQuery } =
  sortedroomsApiSlice;
