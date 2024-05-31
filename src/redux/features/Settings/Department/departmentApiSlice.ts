import { apiSlice } from "redux/api/apiSlice";
import { Department } from "redux/types/Settings/Productions/department";
import { PayloadType } from "redux/types/common/types";

export const departmentApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Department"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      //defining the get end point ,  result type Array
      getDepartments: builder.query<PayloadType<Department[]>, {}>({
        query: (data) => ({
          url: "/department?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Department"],
        transformResponse: (result:PayloadType<Department[]>) => {
          return result;
        },
      }),
      GetAllDepartment: builder.query<Array<Department>, null>({
        query: () => ({ url: "/department" }),
        providesTags: ["Department"],
        transformResponse: (result: {
          payLoad: Array<Department>;
          message: string;
        }) => {
          return result?.payLoad ? result.payLoad  : [];
        },
      }),
      deleteDepartment: builder.mutation({
        query: (id: number) => ({
          url: "/department/" + id,
          method: "DELETE",
        }),

        invalidatesTags: ["Department"],
      }),
      editDepartment: builder.mutation({
        query: (data) => ({
          url: "/department",
          method: "PUT",
          body: data
        }),
        invalidatesTags: ["Department"],
        transformResponse: (result: { message: string; status: string }) => {
          return result;
        },
      }),
      getByIdDepartment: builder.query<Department, string>({
        query: (id) => ({ url: "department/" + id }),
        providesTags: ["Department"],
        transformResponse: (result: {
          payLoad: Department;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
    }),
  });

// Hooks to fetch data directly from the API
export const {
  useGetAllDepartmentQuery,
  useLazyGetDepartmentsQuery,
  useLazyGetByIdDepartmentQuery,
  useEditDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApiSlice;
