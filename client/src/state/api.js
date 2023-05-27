import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "products", "creators", "Transactions", "Geography", "Sales", "Admins", "Performance","Dashboard","Profile"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providedTags: ["User"]
        }),
        getProducts: build.query({
            query: () => "client/products",
            providedTags: ["Products"]
        }),
        getCreators: build.query({
            query: () => "client/creators",
            providedTags: ["creators"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providedTags: ["Geography"]
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providedTags: ["Sales"]
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),

        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providedTags: ["Performance"]
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providedTags: ["Dashboard"]
        }),
        /* addProfile:build.mutation({
            query: ({firstName,lastName, password, confirmPassword}) => ({
                url: "user/profile",
                method: "POST",
                body: {firstName,lastName, password, confirmPassword},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
            }),
            providesTags: ["Profile"]
        }) */
    })
})

export const { 
    useGetUserQuery, 
    useGetProductsQuery, 
    useGetCreatorsQuery, 
    useGetTransactionsQuery, 
    useGetGeographyQuery, 
    useGetSalesQuery, 
    useGetAdminsQuery, 
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
  /*   useAddProfileMutation,  */  
} = api;

