"use client"

import { Button } from "@/components/ui/Button"
import { getAsset } from "@/utils/getAsset"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { IoAddOutline } from "react-icons/io5"

export const NoEvent = () => {
    const router = useRouter()

    return (
        <div>
            <div className="flex flex-col justify-between gap-5 md:w-[60%] md:flex-row md:items-end">
                <h2 className="custom-event-heading text-lg font-medium leading-[3.5rem] md:text-[40px]">
                    Welcome Admin!
                    <br />
                    Your next Event is a click away!
                </h2>

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

            <Image
                src={getAsset("new-event.jpeg", "images")}
                alt="New Event"
                width={600}
                height={500}
                className="mx-auto mt-12 rounded-lg"
            />
        </div>
    )
}
