import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include'
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        //GetUsers
        getUsers: builder.query({
            query: () => ({
                url: '/getUsers'
            }),
            providesTags: ["Users"],
        }),
        //GetUser
        //CreateUser
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/createUser',
                method: 'POST',
                body: newUser
            })
        })
        //EditUser
        //ActiveUser
        //DesactivateUser
    })
});

export const {useCreateUserMutation, useGetUsersQuery} = userApi;