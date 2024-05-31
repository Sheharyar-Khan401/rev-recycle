import { apiSlice } from "redux/api/apiSlice";
import { DocumentType } from "redux/types/common/document";

export const documentTypeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["DocumentType"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getDocumentTypes: builder.query<Array<DocumentType>, null>({
        query: () => ({ url: "/documentType" }),
        providesTags: ["DocumentType"],
        transformResponse: (result: {
          payLoad: Array<DocumentType>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetDocumentTypesQuery } = documentTypeApiSlice;
