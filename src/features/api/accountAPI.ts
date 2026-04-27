import {base_url} from "../../utils/constants.ts";
import type {UserProfile, UserRegister, UserUpdate} from "../../utils/types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const accountApi = createApi({
    reducerPath: 'account',
    baseQuery: fetchBaseQuery({baseUrl:  base_url}),
    tagTypes: ['user'],
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: (user) => ({
                url: '/account/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: user
            })
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: token => ({
                url: '/account/login',
                method: 'POST',
                headers: {
                    Authorization: token
                },
                providesTags:['user']
            })
        }),
        updateUser: builder.mutation<UserProfile, { user:UserUpdate, login:string, token:string }>({
            query: ({user, login, token}) => ({
                url: `account/user/${login}`,
                method: 'PATCH',
                body: user,
                headers: {
                    Authorization: token
                },
                invalidatesTags: ['user']
            })
        }),
        changePassword: builder.mutation<void, {newPassword: string, token: string}>({
            query: ({newPassword, token}) => ({
                url: '/account/password',
                method: 'PATCH',
                body: {password: newPassword},
                headers: {
                    Authorization: token
                }
            })
        })
    })
})

export const {
    useFetchUserQuery,
    useLazyFetchUserQuery,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useChangePasswordMutation
} = accountApi