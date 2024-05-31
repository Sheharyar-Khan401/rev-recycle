import { apiSlice } from "redux/api/apiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import { PayloadType } from "redux/types/common/types";

export const agentsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Agent"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      GetAgent: builder.query<PayloadType<Client[]>, {}>({
        query: (data) => ({
          url: "/client?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Agent"],
      }),
      GetAllAgents: builder.query<Array<Client>, null>({
        query: () => ({ url: "/client?isAgent=true" }),
        providesTags: ["Agent"],
        transformResponse: (result: { payLoad: Array<Client> }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addAgent: builder.mutation({
        query: (body) => ({
          url: "/client",
          method: "POST",
          body: { ...body, agent: true },
        }),
        invalidatesTags: ["Agent"],
      }),
      editAgent: builder.mutation({
        query: (data) => ({
          url: "/client",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Agent"],
      }),
      getByIdAgent: builder.query<Client, string>({
        query: (id) => ({ url: "client/" + id }),
        providesTags: ["Agent"],
        transformResponse: (result: { payLoad: Client; message: string }) => {
          return result.payLoad;
        },
      }),
      deleteAgent: builder.mutation({
        query: (id: number) => ({
          url: "/client/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Agent"],
      }),
    }),
  });
export const {
  useAddAgentMutation,
  useEditAgentMutation,
  useLazyGetAgentQuery,
  useLazyGetByIdAgentQuery,
  useDeleteAgentMutation,
  useGetAllAgentsQuery,
} = agentsApiSlice;
