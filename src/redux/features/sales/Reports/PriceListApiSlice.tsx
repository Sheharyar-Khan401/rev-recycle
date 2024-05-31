import { apiSlice } from "redux/api/apiSlice";
import { PriceList } from "redux/types/Sales/Reports/PriceList";
import { PayloadType } from "redux/types/common/types";

export const priceListApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["PriceList"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPriceList: builder.query<PayloadType<PriceList[]>, {}>({
        query: (data) => ({
          url:
            "/saleOrderItem/getReport?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["PriceList"],
      }),
    }),
  });

export const { useLazyGetPriceListQuery } = priceListApiSlice;
