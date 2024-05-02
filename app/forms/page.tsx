"use client"
import { Input } from "@/components/form"
import { Button } from "@/components/ui/Button"
import { makeToast } from "@/lib/react-toast"
import { NitdaLogo } from "@/public/icons"
import { IBaseApiResponse } from "@/services/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaPhoneAlt } from "react-icons/fa"
import { FaUser } from "react-icons/fa6"
import { MdOutlineEmail } from "react-icons/md"
import { z } from "zod"

import { API_URL } from "@/constants/api_url"
import { useRsvpApi } from "@/services/events/event-hooks"
import { Event } from "@/services/events/events.interface"

const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
})

type schemaType = z.infer<typeof schema>

const Form = () => {
    const searchParams = useSearchParams()

    const router = useRouter()

    const [event, setEvent] = useState<Event | null>(null)

    const { handler } = useRsvpApi()

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    const getEventId = () => {
        const eventId = searchParams.get("eventId")

        if (!eventId) {
            router.push("https://nithub.unilag.edu.ng")

            return makeToast({
                id: "reset-password-error",
                message: "Invalid Event",
                type: "error",
            })
        }

        return eventId
    }

    const getEventDetails = async () => {
        const eventId = getEventId()
        try {
            const response = await axios.get<IBaseApiResponse<Event>>(`${API_URL}/events`, {
                params: {
                    eventId,
                },
            })

            setEvent(response.data.data)
        } catch (error) {
            makeToast({
                id: "event-details-error",
                message: "Error Getting Event Details",
                type: "error",
            })

            router.push("/")
        }
    }

    const onSubmit = async (data: schemaType) => {
        const eventId = getEventId()

        const payload = {
            data,
            query: {
                eventId,
            },
        }

        const response = await handler(payload)

        if (!response || !response.data) return

        makeToast({
            id: "rsvp-success",
            message: "Successfully Signed up for Event. Check your Email",
            type: "success",
        })

        reset()
    }

    useEffect(() => {
        getEventDetails()
    }, [])

    if (!event) return

    return (
        <main className="relative flex min-h-screen items-center justify-center bg-white">
            <NitdaLogo width={120} height={50} className="absolute left-5 top-5" />

            <div className=" mx-auto mt-12 w-[50%] rounded-lg bg-white shadow-lg  ">
                <div
                    style={{
                        background: `url(${event.photo})`,
                        backgroundSize: "cover",
                    }}
                    className="h-[250px] w-full rounded-md"
                ></div>

                <form onSubmit={handleSubmit(onSubmit)} className=" mt-7 flex flex-col gap-4 px-16">
                    <div className="space-y-6 py-8">
                        <div className="mb-4 ">
                            <h1 className="mb-3 text-[28px] font-semibold capitalize text-[#101928]">{event.name}</h1>

                            <p className="text-sm text-[#667185] dark:text-gray-400">{event.description}</p>
                        </div>

                        <div className="flex flex-col gap-7">
                            <Input
                                required
                                label="FIRST NAME"
                                name="firstName"
                                register={register}
                                placeholder="Enter your First Nane"
                                error={errors?.firstName ? errors.firstName.message : undefined}
                                prefixIcon={
                                    <div className="my-auto cursor-pointer pe-4">
                                        <FaUser />
                                    </div>
                                }
                            />
                            <Input
                                required
                                label="LAST NAME"
                                name="lastName"
                                register={register}
                                placeholder="Enter your Last Nane"
                                error={errors?.lastName ? errors.lastName.message : undefined}
                                prefixIcon={
                                    <div className="my-auto cursor-pointer pe-4">
                                        <FaUser />
                                    </div>
                                }
                            />
                            <Input
                                required
                                label="Phone Number"
                                name="phoneNumber"
                                register={register}
                                placeholder="Enter Child"
                                error={errors?.phoneNumber ? errors.phoneNumber.message : undefined}
                                prefixIcon={
                                    <div className="my-auto cursor-pointer pe-4">
                                        <FaPhoneAlt />
                                    </div>
                                }
                            />
                            <Input
                                required
                                type="email"
                                label="EMAIL ADDRESS"
                                name="email"
                                register={register}
                                placeholder="Enter your Email Address"
                                error={errors?.email ? errors.email.message : undefined}
                                prefixIcon={
                                    <div className="my-auto cursor-pointer pe-4">
                                        <MdOutlineEmail />
                                    </div>
                                }
                            />

                            <Button
                                variant="contained"
                                label="Log into Account"
                                type="submit"
                                className=" md:w-[200px]"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Form
