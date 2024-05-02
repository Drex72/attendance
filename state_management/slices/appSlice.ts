/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    sidebarOpened: boolean
    isMobile: boolean
}

const initialState: IInitialState = {
    sidebarOpened: true,
    isMobile: false,
}

const appReduxSlice = createSlice({
    name: "App",
    initialState,
    reducers: {
        setSidebar: (
            state,
            action: {
                payload: boolean
            },
        ) => {
            state.sidebarOpened = action.payload
        },

        toggleSidebar: (state) => {
            state.sidebarOpened = !state.sidebarOpened
        },
        setIsMobile: (
            state,
            action: {
                payload: boolean
            },
        ) => {
            state.isMobile = action.payload
        },
    },
})

export const appSlice = {
    reducer: appReduxSlice.reducer,
    actions: appReduxSlice.actions,
}
