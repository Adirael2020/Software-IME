import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const headApi = createApi({
    reducerPath: 'headApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        //Get All
        getHeadquearters: builder.query({
            query: () => ({
                url: '/headquearters'
            }),
            providesTags: ["Heads"],
        }),
        //Get 1
        getHeadquearter: builder.mutation({
            query: (id) => ({
                url: `/headquearter/${id}`,
                method: 'POST',
            }),
        }),
        //Create
        createHeadquearter: builder.mutation({
            query: (newHeadquearter) => ({
                url: '/createHeadquearter',
                method: 'POST',
                body: newHeadquearter, 
            }),
            invalidatesTags: ["Heads"],
        }),
        //Edit
        editHeadquearter: builder.mutation({
            query: (editHeadquearter) => ({
                url: `/editHeadquearters/${editHeadquearter.id}`,
                method: 'PUT',
                body: editHeadquearter, 
            }),
            invalidatesTags: ["Heads"],
        }),    
        //Delete
        deleteHeadquearter: builder.mutation({
            query: (id) => ({
                url: `/deleteHeadquearter/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: ["Heads"],
        }),
    })
});

export const {useGetHeadqueartersQuery, useGetHeadquearterMutation, useDeleteHeadquearterMutation, useEditHeadquearterMutation, useCreateHeadquearterMutation} = headApi;