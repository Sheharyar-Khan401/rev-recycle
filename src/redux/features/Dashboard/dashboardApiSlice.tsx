import { apiSlice } from "redux/api/apiSlice";
import { CurrentSaleOrder } from "redux/types/Graphs";
import { CodesCount } from "redux/types/Productions/codes";
import {
  dailyProductionGraphResponse,
  issuedMaterialGraphResponse,
} from "redux/types/Productions/dailyProduction";
import { PayloadType } from "redux/types/common/types";

export const dashboardOverviewAPISlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Productions"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTotalGatepasses: builder.query<
        {
          payLoad: {
            saleGatePasses: number;
          };
          numberOfItems: number;
        },
        {}
      >({
        query: (params) => ({
          url: `saleGatePass/totalGatePasses?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["Productions"],
      }),
      getContainersCount: builder.query<
        {
          payLoad: number;
        },
        {}
      >({
        query: (params) => ({
          url: `invoice/containerCount?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["Productions"],
      }),
      getCodesCount: builder.query<
        {
          payLoad: CodesCount[];
        },
        {}
      >({
        query: (params) => ({
          url: `codes/TicketCounterReport?${new URLSearchParams(
            params
          ).toString()}`,
        }),
      }),
      getTotalPurchaseOrderInventory: builder.query<
        {
          payLoad: {
            totalRawMaterialAmount: number;
            totalRawMaterialWeight: number;
          };
          numberOfItems: number;
        },
        {}
      >({
        query: () => ({
          url: `purchaseOrder/Inventory`,
        }),
        providesTags: ["Productions"],
      }),

      getTotalDailyProduction: builder.query<
        {
          payLoad: {
            dailyProductionItems: number;
          };
          numberOfItems: number;
        },
        {}
      >({
        query: () => ({
          url: `dailyProduct/inventory`,
        }),
        providesTags: ["Productions"],
      }),

      getDailyProductionGraphDetails: builder.query<
        {
          payLoad: {
            objectList: dailyProductionGraphResponse[];
            weightKgs: number;
            weightLbs: number;
          };
          numberOfItems: number;
        },
        {}
      >({
        query: (params) => ({
          url: `/dailyProduct/graph?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["Productions"],
      }),
      getIssuedMaterialGraphDetails: builder.query<
        {
          payLoad: {
            objectList: issuedMaterialGraphResponse[];
            weightKgs: number;
            weightLbs: number;
          };
          numberOfItems: number;
        },
        {}
      >({
        query: (params) => ({
          url: `/productionIssuance/issuedMaterialGraph?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["Productions"],
      }),
      getCurrentSaleOrder: builder.query<Array<CurrentSaleOrder>, {}>({
        query: (params) => ({
          url:
            `saleOrderItem/getDashBoardCurrentSaleOrder?` +
            new URLSearchParams(params).toString(),
        }),
        transformResponse: (result: {
          payLoad: Array<CurrentSaleOrder>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const {
  useLazyGetTotalGatepassesQuery,
  useLazyGetContainersCountQuery,
  useLazyGetCodesCountQuery,
  useLazyGetTotalPurchaseOrderInventoryQuery,
  useLazyGetTotalDailyProductionQuery,
  useLazyGetDailyProductionGraphDetailsQuery,
  useLazyGetIssuedMaterialGraphDetailsQuery,
  useLazyGetCurrentSaleOrderQuery,
} = dashboardOverviewAPISlice;
