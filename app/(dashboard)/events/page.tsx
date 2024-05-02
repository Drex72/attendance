"use client"
import { useAppSelector } from "@/state_management"
import { AllEvents } from "./allEvents"
import { NoEvent } from "./no-event"

const Hello = () => {
    const { events } = useAppSelector((state) => state.eventsSlice)
    return (
        <div>
            {events?.length > 0 && <AllEvents />}

            {events?.length <= 0 && <NoEvent />}

            {/* <AllEvents /> */}
        </div>
    )
}

export default Hello
