import { apiSlice } from "redux/api/apiSlice";
import { PaymentTerm } from "redux/types/common/paymentTerm";

export const paymentTermApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["PaymentTerm"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPaymentTerms: builder.query<Array<PaymentTerm>, null>({
        query: () => ({ url: "/paymentTerm" }),
        providesTags: ["PaymentTerm"],
        transformResponse: (result: {
          payLoad: Array<PaymentTerm>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetPaymentTermsQuery } = paymentTermApiSlice;
