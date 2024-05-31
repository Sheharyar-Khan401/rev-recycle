import { apiSlice } from "redux/api/apiSlice";
import { UserData } from "redux/types/Settings/user";
import { PayloadType } from "redux/types/common/types";

export const userApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<PayloadType<UserData[]>, {}>({
        query: (data) => ({
          url: "user?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["User"],
        transformResponse: (result: PayloadType<UserData[]>) => {
          return result;
        },
      }),
      getAllUsers: builder.query<UserData[], null>({
        query: () => ({
          url: "user",
        }),
        providesTags: ["User"],
        transformResponse: (result: {
          payLoad: UserData[];
          numberOfItems: number;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addUser: builder.mutation({
        query: (body) => ({
          url:
            "/user?" +
            new URLSearchParams({
              roles: body?.roles,
              depts: body?.depts,
              invoiceType: body?.invoiceType,
              floors: body?.floors,
            }).toString(),
          method: "POST",
          body: body?.user,
        }),
        invalidatesTags: ["User"],
      }),
      deleteUser: builder.mutation({
        query: (id: number) => ({
          url: "/user/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["User"],
      }),
      editUser: builder.mutation({
        query: (body) => ({
          url:
            "/user?" +
            new URLSearchParams({
              roles: body?.roles,
              depts: body?.depts,
              invoiceType: body?.invoiceType,
              floors: body?.floors,
            }).toString(),
          method: "PUT",
          body: body?.user,
        }),
        invalidatesTags: ["User"],
      }),
      getByUserId: builder.query<UserData, string>({
        query: (id) => ({ url: "user/" + id }),
        providesTags: ["User"],
        transformResponse: (result: { payLoad: UserData }) => {
          return result.payLoad;
        },
      }),
    }),
  });

export const {
  useAddUserMutation,
  useLazyGetUsersQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  useLazyGetByUserIdQuery,
} = userApiSlice;
