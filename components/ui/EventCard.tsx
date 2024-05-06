import CalendarIcon from "@/public/icons/CalendarIcon"
import { Event } from "@/services/events/events.interface"
import { getAsset } from "@/utils"
import { BiTargetLock } from "react-icons/bi"
import { FaRegClock } from "react-icons/fa"
import { FaEllipsis } from "react-icons/fa6"

interface IEventsCard {
    tag: string
    event: Event
}
export function EventCard({ tag, event }: IEventsCard) {
    console.log(event)
    return (
        <article className="border-grayNithub my-8 rounded-lg border bg-[#cedcef]">
            <div className="mobile_lg:flex-col flex justify-between px-5">
                <div className="py-8">
                    <div className="mobile_lg:justify-start flex gap-6">
                        <div className="mobile_lg:w-[150px] mobile_lg:h-[150px]">
                            <img
                                src={event?.photo ?? getAsset("events-img.png", "images")}
                                // width={68}
                                // height={66}
                                className="w-[60px] h-[60px]"
                                alt="event image"
                            />
                        </div>

                        <div className="max-w-md">
                            <h3 className="mb-3 font-semibold">{event?.name ?? "Innovate Tech 2024"}</h3>
                            <p className="mobile_lg:text-[14px] opacity-60">
                                {event?.description ??
                                    " We are excited to have you join us and look forward to an engaging and insightful experience."}
                            </p>
                            <p className="mobile_lg:text-[14px] opacity-60">
                                {event?.id }
                            </p>
                        </div>
                        <div className="mobile_lg:flex hidden">
                            <FaEllipsis className="rotate-90 text-2xl" />
                        </div>
                    </div>

                    <div className="mobile_lg:gap-1 mobile_lg:mt-4 mr-auto mt-10 flex gap-4">
                        <p className="ml-1 rounded-3xl bg-gray-300 px-5 py-2 text-sm text-gray-500">Tech</p>
                        <p className="ml-1 rounded-3xl bg-gray-300 px-5 py-2 text-sm text-gray-500">Fintech</p>
                    </div>
                </div>

                <div className="mobile_lg:py-4 flex flex-col justify-between pb-10 pt-6">
                    <div>
                        <ul className="mobile_lg:flex-col mobile_lg:items-start flex items-center gap-4">
                            <li>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <FaRegClock className="text-xl opacity-55" />
                                    </div>
                                    <div>
                                        <p className="text-sm">{event?.time ?? "5:00 AM to 9:00 PM"}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <BiTargetLock className="text-3xl opacity-55" />
                                    </div>
                                    <div>
                                        <p className="text-sm">NITDA IT HUB Akoka, lagos.</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <CalendarIcon />
                                    </div>
                                    <div className="text-sm">{event?.date ?? "25th of April 3045"}</div>
                                </div>
                            </li>

                            <li className=" tablet_md:hidden">
                                <div
                                    className={` ${tag === "upcoming" ? "text-green" : "text-[#EE7450]"} border-2 ${tag === "upcoming" ? "bg-transparent" : "bg-[#FFBF9D]"} ${tag === "upcoming" ? "border-green" : "border-[#EE7450]"}  rounded-2xl px-4 py-1 text-center  text-sm`}
                                >
                                    {tag}
                                </div>
                            </li>
                            <li className="tablet_md:hidden">
                                <div className="w-fit rounded-lg border-2 border-gray-200 p-1">
                                    <FaEllipsis className="text-2xl" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mobile_lg:mt-6 mobile_lg:grid mobile_lg:grid-cols-2 flex w-full justify-end gap-6">
                        <div className="mobile_lg:border-0 mobile_lg:w-fit flex w-full items-center gap-2 border-r border-r-[#D9D9D9]">
                            <p className="mobile_lg:text-[16px] font-semibold">130</p>

                            <p className="max-w-7 text-[15px]">
                                Total <span className="text-[13px] text-[#868686]">Registeration</span>
                            </p>
                        </div>
                        {tag === "past" && (
                            <div className="mobile_lg:border-0 mobile_lg:w-fit flex w-full items-center gap-2 border-r border-r-[#D9D9D9]">
                                <p className="mobile_lg:text-[16px] font-semibold">130</p>

                                <p className="max-w-7 text-[15px]">
                                    People <span className="text-[13px] text-[#868686]">Attended</span>
                                </p>
                            </div>
                        )}
                        <div className="mobile_lg:w-fit flex w-full items-center  gap-2">
                            <p className="mobile_lg:text-[16px] font-semibold">3months</p>
                            <p className="max-w-7 text-[15px]">
                                Total <span className="text-[13px] text-[#868686]">days</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
