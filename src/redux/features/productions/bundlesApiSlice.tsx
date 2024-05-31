import { apiSlice } from "redux/api/apiSlice";
import { Bundle } from "redux/types/Productions/bundles";

export const bundlesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Bundles"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBundles: builder.query<
        { payLoad: Array<Bundle>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/bundle?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["Bundles"],
      }),
    

      deleteBundle: builder.mutation({
        query: (id: number) => ({
          url: "/bundle/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Bundles"],
      }),
    }),
  });
export const {
  useLazyGetBundlesQuery,
  useDeleteBundleMutation,

} = bundlesApiSlice;
