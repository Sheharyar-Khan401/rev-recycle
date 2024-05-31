import { apiSlice } from "redux/api/apiSlice";
import { ExpenseData } from "redux/types/Sales/setting/expense";
export const expenseApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Settings"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getExpense: builder.query<ExpenseData[], null>({
        query: () => ({
          url: `salesSetting/getExpenseAccount`,
        }),
        providesTags: ["Settings"],
        transformResponse: (result: {
          payLoad: ExpenseData[];
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),

      addExpense: builder.mutation({
        query: (data) => ({
          url: "/salesSetting/addExpense",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Settings"],
      }),
    }),
  });
export const { useGetExpenseQuery, useAddExpenseMutation } =
  expenseApiSlice;
