"use client"
import { AuthentcationGuard } from "@/components/HoC"
import { PageLoader } from "@/components/ui/Loaders"
import SideBar from "@/components/ui/SideBar"
import { NitdaLogo } from "@/public/icons"
import { useViewEvents } from "@/services/events/event-hooks"
import { useAppDispatch, useAppSelector } from "@/state_management"
import { eventsSlice } from "@/state_management/slices/eventsSlice"
import { useEffect, useState } from "react"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [dataFetching, setDataFetching] = useState(false)

    const { handler } = useViewEvents()

    const { events } = useAppSelector((state) => state.eventsSlice)

    const { initializeEvents } = eventsSlice.actions

    const dispatch = useAppDispatch()

    const getAllEvents = async () => {
        setDataFetching(true)

        const events = await handler(undefined)

        events && dispatch(initializeEvents(events?.data))

        setDataFetching(false)
    }

    useEffect(() => {
        !events.length && getAllEvents()
    }, [])

    if (dataFetching) return <PageLoader />

    return (
        <AuthentcationGuard type="protected">
            <main className="relative flex h-screen bg-white">
                <NitdaLogo width={120} height={50} className="absolute left-5 top-5" />

                <div className="mx-auto flex w-[95%]">
                    <div className="flex items-center">
                        <SideBar />
                    </div>

                    <main
                        id="main-content"
                        className="relative !z-0 w-full max-w-[1500px] overflow-y-scroll px-8 py-[120px] md:ml-[50px] "
                    >
                        {children}
                    </main>
                </div>
            </main>
        </AuthentcationGuard>
    )
}

export default DashboardLayout
