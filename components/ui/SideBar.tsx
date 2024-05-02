"use client"
import { EventsIcon, VisitorsIcon } from "@/public/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
type SideBarProps = {
    name?: string
    link?: string
    icon?: React.ReactNode
}

const SidebarItem = ({ name, link, icon }: SideBarProps) => {
    const pathname = usePathname()
    console.log(pathname.split("/"))
    return (
        <li className="sidebarItem">
            <Link
                href={link || "#"}
                className={`group flex cursor-pointer flex-col items-center rounded-md px-4 py-3 transition-all duration-150 ease-in-out  ${pathname.split("/")[1] === link ? "bg-primary text-white" : "hover:bg-[#c6dbcd]"}`}
            >
                {icon}
                {name && <p >{name}</p>}
            </Link>
        </li>
    )
}

const SideBar = () => {
    return (
        <div className="my-5 min-h-[500px] w-[80px] rounded-2xl bg-[#F9F9F9] py-4">
            <ul className="list-none flex-col space-y-6 text-center">
                <SidebarItem name="Events" link="events" icon={<EventsIcon link="events" />} />
                <SidebarItem name="Admins" link="/admins" icon={<VisitorsIcon link="/admins" />} />
            </ul>
        </div>
    )
}

export default SideBar
