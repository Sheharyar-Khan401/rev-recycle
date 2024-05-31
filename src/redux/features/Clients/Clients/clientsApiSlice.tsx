import { apiSlice } from "redux/api/apiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import { PayloadType } from "redux/types/common/types";

export const clientsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Client"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetClient: builder.query<PayloadType<Client[]>, {}>({
        query: (data) => ({
          url: "/client?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Client"],
      }),
      GetAllClients: builder.query<Array<Client>, null>({
        query: () => ({ url: "/client?isClient=true" }),
        providesTags: ["Client"],
        transformResponse: (result: { payLoad: Array<Client> }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addClient: builder.mutation({
        query: (body) => ({
          url: "/client",
          method: "POST",
          body: { ...body, client: true },
        }),
        invalidatesTags: ["Client"],
      }),
      editClient: builder.mutation({
        query: (data) => ({
          url: "/client",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Client"],
      }),
      getByIdClient: builder.query<Client, string>({
        query: (id) => ({ url: "client/" + id }),
        providesTags: ["Client"],
        transformResponse: (result: { payLoad: Client; message: string }) => {
          return result.payLoad;
        },
      }),
      deleteClient: builder.mutation({
        query: (id: number) => ({
          url: "/client/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Client"],
      }),
    }),
  });
export const {
  useAddClientMutation,
  useEditClientMutation,
  useLazyGetByIdClientQuery,
  useLazyGetClientQuery,
  useDeleteClientMutation,
  useGetAllClientsQuery,
} = clientsApiSlice;
