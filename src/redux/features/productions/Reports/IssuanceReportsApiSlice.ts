import { apiSlice } from "redux/api/apiSlice";
import Issuance from "redux/types/Productions/Reports/Issuance";
import { PayloadType } from "redux/types/common/types";

export const issuanceReportsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getIssuanceReports: builder.query<PayloadType<Issuance[]>, {}>({
        query: (data) => ({
          url:
            "/productionIssuance/Report?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetIssuanceReportsQuery } = issuanceReportsApiSlice;
