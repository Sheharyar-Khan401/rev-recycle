import { apiSlice } from "redux/api/apiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";

export const orderStatusApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["OrderStatus"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getOrderStatus: builder.query<OrderStatus[], null>({
        query: () => ({
          url: "/orderStatus",
        }),
        providesTags: ["OrderStatus"],
        transformResponse: (result: { payLoad: OrderStatus[] }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetOrderStatusQuery } = orderStatusApiSlice;
