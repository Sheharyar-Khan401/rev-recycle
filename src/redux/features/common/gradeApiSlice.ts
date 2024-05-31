import { apiSlice } from "redux/api/apiSlice";
import { GradeRequest } from "redux/types/Settings/Productions/grade";
import { Grade } from "redux/types/common/grade";

export const gradeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Grade"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getGrades: builder.query<Array<Grade>, null>({
        query: () => ({ url: "/grade" }),
        providesTags: ["Grade"],
        transformResponse: (result: {
          payLoad: Array<Grade>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addGrade: builder.mutation({
        query: (data: GradeRequest[]) => ({
          url: "/grade",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Grade"],
      }),
    }),
  });
export const { useGetGradesQuery, useAddGradeMutation } = gradeApiSlice;
