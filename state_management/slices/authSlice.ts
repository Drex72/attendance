/* eslint-disable no-param-reassign */
import { IUser } from "@/services/auth/auth.interface"
import { createSlice } from "@reduxjs/toolkit"


interface IInitialState {
    data: IUser | null
    isAuthenticated: boolean
    isLoading: boolean,
}

const initialState: IInitialState = {
    data: null,
    isAuthenticated: false,
    isLoading: true,
}

const authReduxSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.data = null
        },

        login: (state, action: { payload: IUser }) => {
            state.isAuthenticated = true
            state.data = action.payload
        },

        stopLoading: (state) => {
            state.isLoading = false
        },
    },
})

export const authSlice = {
    reducer: authReduxSlice.reducer,
    actions: authReduxSlice.actions,
}
