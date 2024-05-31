import { apiSlice } from "redux/api/apiSlice";
import { Role } from "redux/types/Settings/role";
import { PayloadType } from "redux/types/common/types";

export const roleApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Role"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBranchRoles: builder.query<PayloadType<Role[]>, {}>({
        query: (data) => ({
          url: "role?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Role"],
        transformResponse: (result: PayloadType<Role[]>) => {
          return result;
        },
      }),
      getAllBranchRoles: builder.query<Array<Role>, null>({
        query: () => ({
          url: "role",
        }),
        providesTags: ["Role"],
        transformResponse: (result: {
          payLoad: Array<Role>;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
      addRole: builder.mutation({
        query: (body) => {
          const { screenAction, ...rest } = body;
          return {
            url: "/role",
            method: "POST",
            body: { ...rest, screenAction },
          };
        },
        invalidatesTags: ["Role"],
      }),
      deleteRole: builder.mutation({
        query: (id: number) => ({
          url: "/role/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Role"],
      }),
      editRole: builder.mutation({
        query: (data: {
          roleId: number;
          roleName: string;
          screenAction: number[];
        }) => ({
          url: `/role`,
          method: "PUT",
          body: {
            roleId: data.roleId,
            roleName: data.roleName,
            screenAction: data.screenAction,
          },
        }),
        invalidatesTags: ["Role"],
      }),
      getByRoleId: builder.query<Role, string>({
        query: (id) => ({ url: "role/" + id }),
        providesTags: ["Role"],
        transformResponse: (result: { payLoad: Role; message: string }) => {
          return result.payLoad;
        },
      }),
    }),
  });

export const {
  useAddRoleMutation,
  useLazyGetBranchRolesQuery,
  useGetAllBranchRolesQuery,
  useGetBranchRolesQuery,
  useDeleteRoleMutation,
  useEditRoleMutation,
  useLazyGetByRoleIdQuery,
} = roleApiSlice;
