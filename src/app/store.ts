import {configureStore} from "@reduxjs/toolkit";
import token from '../features/token/tokenSlice.ts'
import {accountApi} from "../features/api/accountAPI.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        token,
        [accountApi.reducerPath]: accountApi.reducer,
    },
    preloadedState: JSON.parse(localStorage.getItem('state') || '{}') as {token: string},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(accountApi.middleware)
})

store.subscribe(() => localStorage.setItem('state', JSON.stringify(store.getState())));
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch