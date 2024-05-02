"use client"

import { useAppSelector } from "@/state_management"
import { redirect } from "next/navigation"
import React, { ReactElement, useEffect, useState } from "react"
import { PageLoader } from "../ui/Loaders"

interface RequireAuthProps {
    children: ReactElement
    type: "protected" | "unprotected"
}

export const AuthentcationGuard: React.FC<RequireAuthProps> = ({ children, type }) => {
    const { isAuthenticated } = useAppSelector((state) => state.authSlice)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        if (type === "protected" && !isAuthenticated) {
            return redirect("/login")
        }

        if (type === "unprotected" && isAuthenticated) {
            return redirect("/")
        }

        setLoading(false)
    }, [isAuthenticated, type])

    if (loading) return <PageLoader />

    return children
}
