import { apiSlice } from "redux/api/apiSlice";
import { LabelTypesData } from "redux/types/Settings/Productions/labeltype";

export const labeltypesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["LabelTypes"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      //defining the get end point ,  result type Array of Labeltypes
      GetLabelTypes: builder.query<Array<LabelTypesData>, null>({
        query: () => ({ url: "labelType" }),
        providesTags: ["LabelTypes"],
        transformResponse: (result: {
          payLoad: Array<LabelTypesData>;
          message: string;
        }) => {
          return result?.payLoad ? result?.payLoad : [];
        },
      }),
      addLabelTypes: builder.mutation({
        query: (body) => ({
          url: "/labelType",
          method: "POST",
          body: body,
        }),
        //refetching list
        invalidatesTags: ["LabelTypes"],
      }),
    }),
  });

// Hooks to fetch data directly from the API
export const { useAddLabelTypesMutation, useGetLabelTypesQuery } =
  labeltypesApiSlice;
