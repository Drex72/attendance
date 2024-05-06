"use client"
import { Input, TextArea } from "@/components/form"
import { DateInput } from "@/components/form/Input/DateInput"
import { TimeInput } from "@/components/form/Input/TimeInput"
import { Button } from "@/components/ui/Button"
import { useFileUpload } from "@/hooks/useFileUpload"
import { makeToast } from "@/lib/react-toast"
import { useCreateEvent } from "@/services/events/event-hooks"
import { useAppDispatch } from "@/state_management"
import { eventsSlice } from "@/state_management/slices/eventsSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { z } from "zod"

const schema = z.object({
    name: z.string(),
    description: z.string(),
    limit: z.string().optional(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
})

type schemaType = z.infer<typeof schema>
const CreateEvent = () => {
    const router = useRouter()

    const dispatch = useAppDispatch()

    const { addEvent } = eventsSlice.actions

    const { handler, loading } = useCreateEvent()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    const { handleImageUpload, handleImageDelete, imageUrl } = useFileUpload()

    const [imageFile, setImageFile] = useState<File | null>(null)

    const fileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files) return

        setImageFile(files[0])

        handleImageUpload(files[0])
    }

    const onSubmit = async (data: schemaType) => {
        const formData = new FormData()
        const { name, description, limit, date, time, location } = data

        if (!imageFile) {
            return makeToast({
                type: "error",
                message: "Please Upload Image",
                id: "upload-image-error",
            })
        }

        formData.append("name", name)
        formData.append("description", description)
        formData.append("date", "2024-11-21")
        formData.append("time", "12:00 PM")
        formData.append("coverPhoto", imageFile!)

        if (limit) {
            formData.append("limit", limit.toString())
        }

        const response = await handler(formData)

        if (!response || !response.data) return

        dispatch(addEvent(response.data))

        reset()

        makeToast({
            id: "Event-success",
            message: "Created Event Successfully",
            type: "success",
        })

        router.push("/events")
    }

    return (
        <div>
            <div className="flex w-full items-end justify-end">
                <Button
                    variant="contained"
                    label="Cancel"
                    className="w-[150px] !bg-[#FF9494] !text-black hover:border-[#FF9494] hover:!text-[#FF9494]"
                    onClick={() => router.push("/events")}
                />
            </div>

            <h2 className="mb-10 text-[40px] font-semibold text-[#1E1E1E]">Create Event</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid-cols-12 gap-4 md:grid">
                <div className="col-span-7 flex flex-col gap-8 rounded-lg bg-white px-[40px] py-[56px] shadow-lg">
                    <Input
                        required
                        label="NAME"
                        name="name"
                        register={register}
                        placeholder="Event 101"
                        disabled={loading}
                        error={errors?.name ? errors.name.message : undefined}
                    />

                    <TextArea
                        required
                        label="DESCRIPTION"
                        name="description"
                        register={register}
                        disabled={loading}
                        placeholder="Enter Event Description"
                        error={errors?.description ? errors.description.message : undefined}
                    />

                    <div className="flex w-1/2 items-center gap-5">
                        <DateInput
                            required
                            label="DATE"
                            name="date"
                            register={register}
                            disabled={loading}
                            error={errors?.date ? errors.date.message : undefined}
                        />

                        <TimeInput
                            required
                            label="TIME"
                            name="time"
                            register={register}
                            disabled={loading}
                            error={errors?.time ? errors.time.message : undefined}
                        />
                    </div>

                    <Input
                        label="LOCATION"
                        name="location"
                        register={register}
                        disabled={loading}
                        placeholder="NITDA IT HUB, Lagos Akoka"
                        error={errors?.location ? errors.location.message : undefined}
                    />

                    <Input
                        type="number"
                        label="LIMIT"
                        name="limit"
                        register={register}
                        disabled={loading}
                        placeholder="9"
                        error={errors?.limit ? errors.limit.message : undefined}
                    />
                </div>

                <div className="col-start-8 col-end-13  rounded-lg bg-white px-[40px] py-[56px] shadow-lg">
                    {imageUrl && (
                        <div className="relative">
                            <Image
                                src={imageUrl}
                                alt="Event Image"
                                width={100}
                                height={100}
                                className=" border-grey-200 h-[90%] w-full border"
                            />

                            <button
                                onClick={handleImageDelete}
                                className="absolute bottom-4 right-4 cursor-pointer rounded-full border border-red-500 bg-red-500 p-3 text-white transition-all duration-150 ease-in-out  hover:bg-white hover:text-red-500 "
                            >
                                <MdDeleteOutline className="text-4xl " />
                            </button>
                        </div>
                    )}

                    {!imageUrl && (
                        <label
                            style={{ background: "rgb(241 245 249 / 1)" }}
                            className="group flex h-[90%]  w-full cursor-pointer items-center justify-center rounded-lg"
                        >
                            <div>
                                <FaCloudUploadAlt className="mx-auto h-[60px] w-[60px] text-center text-[#676767] transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:text-[#3c3c3c]" />
                                <p className="text-sm text-[#667185] dark:text-gray-400">
                                    Click here to upload your files
                                </p>
                            </div>

                            <input onChange={fileUpload} type="file" className="h-0 w-0 " />
                        </label>
                    )}

                    <div className="mt-7 flex justify-end">
                        <Button variant="contained" type="submit" label="Create Event" loading={loading} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateEvent
