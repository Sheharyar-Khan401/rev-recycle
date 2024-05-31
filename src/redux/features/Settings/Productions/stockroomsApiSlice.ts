import { apiSlice } from "redux/api/apiSlice";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
export const stockroomsApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Stockrooms"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetStockRooms: builder.query<Array<StockroomsData>, null>({
        query: () => ({ url: "stockRoom" }),
        providesTags: ["Stockrooms"],
        transformResponse: (result: {
          payLoad: Array<StockroomsData>;
          message: string;
        }) => {
          return result?.payLoad ? result?.payLoad : [];
        },
      }),
      addStockRooms: builder.mutation({
        query: (body) => ({
          url: "/stockRoom",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Stockrooms"],
      }),
    }),
  });
export const { useGetStockRoomsQuery, useAddStockRoomsMutation } =
  stockroomsApiSlice;
