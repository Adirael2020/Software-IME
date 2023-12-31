import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const specApi = createApi({
    reducerPath: 'SpecApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include'
    }),
    tagTypes: ["Spec"],
    endpoints: (builder) => ({
        //Get All
        getSpecialties: builder.query({
            query: () => ({
                url: '/getSpecialties'
            }),
            providesTags: ["Spec"],
        }),
        //Get 1
        getSpecialty: builder.mutation({
            query: (id) => ({
                url: `/getSpecialty/${id}`,
                method: 'POST',
            }),
        }),
        //Create
        createSpecialty: builder.mutation({
            query: (newSpecialty) => ({
                url: '/createSpecialty',
                method: 'POST',
                body: newSpecialty, 
            }),
            invalidatesTags: ["Spec"],
        }),
        //Edit
        editSpecialty: builder.mutation({
            query: (editSpecialty) => ({
                url: `/editSpecialty/${editSpecialty.id}`,
                method: 'PUT',
                body: editSpecialty, 
            }),
            invalidatesTags: ["Spec"],
        }),    
        //Delete
        deleteSpecialty: builder.mutation({
            query: (id) => ({
                url: `/deleteSpecialty/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: ["Spec"],
        }),
    })
});

export const {useCreateSpecialtyMutation,
    useGetSpecialtiesQuery,
    useDeleteSpecialtyMutation,
    useGetSpecialtyMutation,
    useEditSpecialtyMutation} = specApi;