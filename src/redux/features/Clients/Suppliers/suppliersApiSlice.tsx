import { apiSlice } from "redux/api/apiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import { PayloadType } from "redux/types/common/types";

export const suppliersApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Supplier"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetSupplier: builder.query<PayloadType<Client[]>, {}>({
        query: (data) => ({
          url: "client?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Supplier"],
      }),
      GetAllSupplier: builder.query<Array<Client>, null>({
        query: () => ({ url: "client?isSupplier=true" }),
        providesTags: ["Supplier"],
        transformResponse: (result: { payLoad: Array<Client> }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      GetAllAgentsSupplier: builder.query<Array<Client>, null>({
        query: () => ({ url: "client?isAgent=true" }),
        providesTags: ["Supplier"],
        transformResponse: (result: { payLoad: Array<Client> }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addSupplier: builder.mutation({
        query: (body) => ({
          url: "/client",
          method: "POST",
          body: { ...body, supplier: true },
        }),
        invalidatesTags: ["Supplier"],
      }),
      editSupplier: builder.mutation({
        query: (data) => ({
          url: "/client",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Supplier"],
      }),
      getByIdSupplier: builder.query<Client, string>({
        query: (id) => ({ url: "client/" + id }),
        providesTags: ["Supplier"],
        transformResponse: (result: { payLoad: Client; message: string }) => {
          return result.payLoad;
        },
      }),
      deleteSupplier: builder.mutation({
        query: (id: number) => ({
          url: "/client/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Supplier"],
      }),
    }),
  });
export const {
  useAddSupplierMutation,
  useEditSupplierMutation,
  useLazyGetByIdSupplierQuery,
  useLazyGetSupplierQuery,
  useDeleteSupplierMutation,
  useGetAllAgentsSupplierQuery,
  useGetAllSupplierQuery,
} = suppliersApiSlice;
