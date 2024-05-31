import { apiSlice } from "redux/api/apiSlice";
import { Grade } from "redux/types/common/grade";
export const GradeApiSlice = apiSlice
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

    }),
  });

export const {useLazyGetGradesQuery} =
  GradeApiSlice;
