import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, registerUser, changePassword} from "../api/accountAPI.ts";

const initialState = ''

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (_state, action) => action.payload,
        clearToken: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (_state, action) => action.payload.token)
            .addCase(fetchUser.fulfilled, (_state, action) => action.payload.token)
            .addCase(changePassword.fulfilled, (_state, action) => action.payload)
    }
})

export const {setToken, clearToken} = tokenSlice.actions;
export default tokenSlice.reducer;