import { apiSlice } from "redux/api/apiSlice";
import { PurchaseMethodData } from "redux/types/common/purchaseMethod";
export const GradeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["PurchaseMethod"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPurchaseMethod: builder.query<Array<PurchaseMethodData>, null>({
        query: () => ({ url: "/purchaseMethod" }),
        providesTags: ["PurchaseMethod"],
        transformResponse: (result: {
          payLoad: Array<PurchaseMethodData>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),

    }),
  });

export const {useGetPurchaseMethodQuery} =
  GradeApiSlice;
