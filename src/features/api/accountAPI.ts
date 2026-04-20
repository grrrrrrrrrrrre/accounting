import {createAsyncThunk} from "@reduxjs/toolkit";
import {base_url, createToken} from "../../utils/constants.ts";
import type {UserProfile, UserRegister, UserUpdate} from "../../utils/types";
import type {RootState} from "../../app/store.ts";

export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${base_url}/account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        if (response.status === 409) {
            throw new Error(`User with login ${user.login}`)
        }
        if (!response.ok) {
            throw new Error(`User with login ${user.login}`)
        }
        const data = await response.json()
        const token = createToken(user.login, user.password)
        return {
            token, //token: token
            user: data
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${base_url}/account/login`,{
            method: 'POST',
            headers: {
                Authorization: token
            }
        })
        if (response.status === 401) {
            throw new Error('Invalid credentials')
        }
        if (!response.ok) {
            throw new Error('Something went wrong')
        }
        const user = await response.json()
        return {user, token}
    }
)

export const updateUser = createAsyncThunk<UserProfile, UserUpdate, {state: RootState}>(
    'user/update',
    async (user, {getState})=> {
        const response = await fetch(`${base_url}/account/user/${getState().user.login}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().token
            },
            body: JSON.stringify(user)
            });
        if (response.status === 401) {
            throw new Error('Invalid credentials')
        }
        if (!response.ok) {
            throw new Error('Something went wrong')
        }
        return await response.json()
    }
)

export const changePassword = createAsyncThunk<string, {newPassword: string, oldPassword: string}, { state:RootState }>(
    'user/password',
    async ({newPassword, oldPassword}, {getState}) => {
        const response = await fetch(`${base_url}/account/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: createToken(getState().user.login, oldPassword)
            },
            body: JSON.stringify({password: newPassword})
        })
        if (response.status === 401) {
            throw new Error('Invalid credentials')
        }
        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }
        return createToken(getState().user.login, newPassword);
    }
)