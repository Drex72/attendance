/* eslint-disable no-param-reassign */
import { Event } from "@/services/events/events.interface"
import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    events: Event[]
}

const initialState: IInitialState = {
    events: [],
}

const eventsReduxSlice = createSlice({
    name: "Events",
    initialState,
    reducers: {
        initializeEvents: (state, action: { payload: Event[] }) => {
            state.events = action.payload
        },

        addEvent: (state, action: { payload: Event }) => {
            state.events = [...state.events, action.payload]
        },
    },
})

export const eventsSlice = {
    reducer: eventsReduxSlice.reducer,
    actions: eventsReduxSlice.actions,
}
