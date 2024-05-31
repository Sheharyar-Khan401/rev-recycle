import { apiSlice } from "redux/api/apiSlice";
import { store } from "redux/store";
import { UserData } from "redux/types/Settings/user";
import { BusinessRequest, BusinessType } from "redux/types/common/business";
import { setUser } from "redux/features/auth/authSlice";

export const gradeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Business"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBusinessTypes: builder.query<Array<BusinessType>, null>({
        query: () => ({ url: "/businesstypes" }),
        providesTags: ["Business"],
        transformResponse: (result: {
          payLoad: Array<BusinessType>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addBusinessTypes: builder.mutation({
        query: (body: BusinessRequest) => ({
          url: "/business",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Business"],
        transformResponse: (result: { payLoad: UserData }) => {
          store.dispatch(setUser(result.payLoad));
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetBusinessTypesQuery, useAddBusinessTypesMutation } =
  gradeApiSlice;
