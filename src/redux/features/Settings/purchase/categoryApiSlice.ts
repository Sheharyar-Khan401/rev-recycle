import { apiSlice } from "redux/api/apiSlice";
import { AllCategoryItems, CategoryRequest } from "redux/types/Settings/Purchase/categories";
export const categoryApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Categories"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategory: builder.query<Array<CategoryRequest>, boolean>({
        query: (isProduction: boolean) => ({
          url: `/category?isProduction=${isProduction}`,
        }),
        providesTags: ["Categories"],
        transformResponse: (result: {
          payLoad: Array<CategoryRequest>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),

      getAllCategoryItems: builder.query<Array<AllCategoryItems>, null>({
        query: () => ({ url: `/category/getAll` }),
        providesTags: ["Categories"],
        transformResponse: (result: {
          payLoad: Array<AllCategoryItems>;
          message: string;
          numberOfItems: number
        }) => {
          return result.payLoad;
        },
      }),

      getCategoryByRoot: builder.query<Array<CategoryRequest>, boolean>({
        query: (isProduction: boolean) => ({
          url: `/category?isProduction=${isProduction}&getRoot=true`,
        }),
        providesTags: ["Categories"],
        transformResponse: (result: {
          payLoad: Array<CategoryRequest>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addCategory: builder.mutation({
        query: (body) => ({
          url: `/category?parentCatId=${body.catId}&isProduction=${body.isProduction}`,
          method: "POST",
          body: body.rowDat,
        }),
        invalidatesTags: ["Categories"],
      }),
    }),
  });

export const {
  useAddCategoryMutation,
  useGetCategoryQuery,
  useGetCategoryByRootQuery,
  useLazyGetCategoryQuery,
  useGetAllCategoryItemsQuery
} = categoryApiSlice;
