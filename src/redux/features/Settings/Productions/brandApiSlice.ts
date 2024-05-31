import { apiSlice } from "redux/api/apiSlice";
import {
  Brand,
  BrandItemsResponse,
} from "redux/types/Settings/Productions/brand";
import { PayloadType } from "redux/types/common/types";

export const brandApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Brand"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetBrands: builder.query<PayloadType<Brand[]>, {}>({
        query: (data) => ({
          url: "brand?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Brand"],
        transformResponse: (result: PayloadType<Brand[]>) => {
          return result;
        },
      }),
      GetAllBrands: builder.query<Brand[], null>({
        query: () => ({
          url: "brand",
        }),
        providesTags: ["Brand"],
        transformResponse: (result: {
          payLoad: Array<Brand>;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
      addBrand: builder.mutation({
        query: (body) => ({
          url: "/brand",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Brand"],
      }),
      editBrand: builder.mutation({
        query: (data) => ({
          url: "/brand",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Brand"],
      }),
      getByIdBrand: builder.query<Brand, string>({
        query: (id) => ({ url: "brand/" + id }),
        providesTags: ["Brand"],
        transformResponse: (result: { payLoad: Brand; message: string }) => {
          return result.payLoad;
        },
      }),
      getBrandItems: builder.query<BrandItemsResponse[], string>({
        query: (id) => ({ url: "brand/getItemsByBrand/" + id }),
        providesTags: ["Brand"],
        transformResponse: (result: {
          payLoad: BrandItemsResponse[];
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addBrandItems: builder.mutation({
        query: (body) => ({
          url:
            "/brand/addEditBrandItems?" + new URLSearchParams(body).toString(),
          method: "POST",
        }),
        invalidatesTags: ["Brand"],
      }),
      deleteBrand: builder.mutation({
        query: (id: number) => ({
          url: "/brand/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Brand"],
      }),
    }),
  });
export const {
  useAddBrandMutation,
  useEditBrandMutation,
  useLazyGetByIdBrandQuery,
  useLazyGetBrandItemsQuery,
  useGetBrandsQuery,
  useLazyGetBrandsQuery,
  useDeleteBrandMutation,
  useGetAllBrandsQuery,
  useAddBrandItemsMutation,
} = brandApiSlice;
