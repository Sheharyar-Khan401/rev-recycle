import { apiSlice } from "redux/api/apiSlice";
import { ShipVia } from "redux/types/common/shipvia";

export const shipviaApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ShipVia"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getShipVia: builder.query<Array<ShipVia>, null>({
        query: () => ({ url: "/shipVia" }),
        providesTags: ["ShipVia"],
        transformResponse: (result: {
          payLoad: Array<ShipVia>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetShipViaQuery } = shipviaApiSlice;
