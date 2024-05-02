"use client"
import { EventCard } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { useAppSelector } from "@/state_management"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoAddOutline } from "react-icons/io5"

export function AllEvents() {
    const [activeTab, setActiveTab] = useState("Upcoming")

    // const [pastEvents, setPastEvents] = useState([1, 2, 3, 5, 6])

    // const [upcomingEvents, setUpcomingEvents] = useState([1, 2, 3])

    const { events } = useAppSelector((state) => state.eventsSlice)
    const router = useRouter()

    function isFutureOrPast(dateString: string): string {
        // Parse the date string
        const date = new Date(dateString);
      
        // Get the current date
        const currentDate = new Date();
      
        // Compare the date with the current date
        if (date >= currentDate) {
          return "Upcoming";
        } else if (date < currentDate) {
          return "Past";
        } else {
          return "Current";
        }
      }

    const filterEvents = () => {

        const upcomingEvents =  events.filter(event => isFutureOrPast(event.date)  === 'Upcoming');

        const pastEvents = events.filter(event => isFutureOrPast(event.date)  === 'Past');

        return {
            upcomingEvents: upcomingEvents,
            pastEvents: pastEvents,
        }
    }

    const { pastEvents, upcomingEvents } = filterEvents()

    return (
        <div className="container mx-auto p-4">
            <div className="flex w-full items-end justify-end">
                <Button
                    variant="contained"
                    label={
                        <div className="flex items-center gap-3">
                            <IoAddOutline />
                            Create New Event
                        </div>
                    }
                    onClick={() => router.push("/events/create-event")}
                />
            </div>
            <div className="flex border-b border-b-gray-400 ">
                <div
                    className={`cursor-pointer border-b-2 border-transparent p-2   ${
                        activeTab === "Upcoming" ? "border-b-green" : ""
                    }`}
                    onClick={() => setActiveTab("Upcoming")}
                >
                    Upcoming
                    <span className="ml-1 rounded-lg bg-gray-300 px-2 py-1 text-sm text-gray-500">
                        {upcomingEvents.length}
                    </span>
                </div>
                <div
                    className={` cursor-pointer border-b-2 border-transparent p-2 ${
                        activeTab === "Past" ? "border-b-green" : ""
                    }`}
                    onClick={() => setActiveTab("Past")}
                >
                    Past
                    <span className="ml-1 rounded-lg bg-gray-300 px-2 py-1 text-sm text-gray-500">
                        {pastEvents.length}
                    </span>
                </div>
            </div>

            <div
                id="Upcoming"
                className="city-content"
                style={{ display: activeTab === "Upcoming" ? "block" : "none" }}
            >
                {upcomingEvents.map((event, index) => (
                    <EventCard key={index} tag="upcoming" event={event} />
                ))}
            </div>

            <div id="Past" className="city-content" style={{ display: activeTab === "Past" ? "block" : "none" }}>
                {pastEvents.map((event, index) => (
                    <EventCard key={index} tag="past" event={event} />
                ))}
            </div>
        </div>
    )
}
