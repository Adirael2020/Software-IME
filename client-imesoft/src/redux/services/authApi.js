import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        //Login
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/loginUser',
                method: 'POST',
                body: credentials, 
            }),
        }),
        //Exit
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logoutUser',
                method: 'POST', 
            }),
        }),
        //Refresh
        loadUser: builder.mutation({
            query: (credentials) => ({
                url: '/loadUserToken',
                method: 'POST',
                body: credentials, 
            }),
        })
        ,
        //Edit
        editProfileUser: builder.mutation({
            query: (updatedData) => ({
                url: '/', //Aun no creada
                method: 'PUT', 
                body: updatedData, 
            }),
        }),
    })
});

export const { useLoginUserMutation, useLoadUserMutation, useLogoutUserMutation } = authApi;