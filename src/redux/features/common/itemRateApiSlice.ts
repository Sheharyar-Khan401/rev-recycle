import { apiSlice } from "redux/api/apiSlice";
import { ItemRateRequest } from "redux/types/common/itemrate";

export const ItemRateApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ItemRate "] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getclientitem: builder.query<Array<ItemRateRequest>, null>({
        query: () => ({ url: "/clientItemRates/client" }),
        providesTags: ["ItemRate "],
        transformResponse: (result: {
          payLoad: Array<ItemRateRequest>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      getclientitemByClientId: builder.query<Array<ItemRateRequest>, number>({
        query: (id) => ({ url: "/clientItemRates/client/" + id }),
        providesTags: ["ItemRate "],
        transformResponse: (result: {
          payLoad: Array<ItemRateRequest>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetclientitemQuery, useLazyGetclientitemByClientIdQuery } =
  ItemRateApiSlice;
