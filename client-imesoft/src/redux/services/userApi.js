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
        getUser: builder.mutation({
            query: (id) => ({
                url: `/getUser/${id}`,
                method: 'POST',
            }),
        }),
        //CreateUser
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/createUser',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ["Users"],
        }),
        //EditUser
        editUser: builder.mutation({
            query: (editUser) => ({
                url: `/editUser/${editUser._id}`,
                method: 'PUT',
                body: editUser,
            }),
            invalidatesTags: ["Users"],
        }),
        //EditProfile
        editProfileUser: builder.mutation({
            query: (editProfile) => ({
                url: `/editProfileUser/${editProfile._id}`,
                method: 'PUT',
                body: editProfile,
            }),
            invalidatesTags: ["Users"],
        }),
        //ResetPassword
        resetPassword: builder.mutation({
            query: (id) => ({
                url: `/resetPassword/${id}`,
                method: 'PUT'
            }),
        }),
        //EditPassword
        editPassword: builder.mutation({
            query: (edit) => ({
                url: `/editPassword/${edit._id}`,
                method: 'PUT',
                body: edit
            }),
        }),
        //ActivateUser
        activateUser: builder.mutation({
            query: (id) => ({
                url: `/activateUser/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ["Users"],
        }),
        //deactivateUser
        deactivateUser: builder.mutation({
            query: (id) => ({
                url: `/deactivateUser/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ["Users"],
        })
    })
});

export const { useCreateUserMutation, useGetUsersQuery, useGetUserMutation, useEditUserMutation, useActivateUserMutation, useDeactivateUserMutation, useResetPasswordMutation, useEditProfileUserMutation, useEditPasswordMutation } = userApi;