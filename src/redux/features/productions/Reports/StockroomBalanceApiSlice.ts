import { apiSlice } from "redux/api/apiSlice";
import { StockroomBalance } from "redux/types/Productions/Reports/StockroomBalance";
import { PayloadType } from "redux/types/common/types";

export const stockroomBalanceReportsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getStockroomBalanceReports: builder.query<
        PayloadType<StockroomBalance[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/stockRoom/getStockRoomBalanceReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetStockroomBalanceReportsQuery } =
  stockroomBalanceReportsApiSlice;
