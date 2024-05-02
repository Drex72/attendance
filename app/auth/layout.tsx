"use client"

import { AuthentcationGuard } from "@/components/HoC"
import { NitdaLogo } from "@/public/icons"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthentcationGuard type="unprotected">
            <main className="relative flex h-screen items-center justify-center bg-[#ededee] ">
                <NitdaLogo width={150} height={50} className="absolute left-5 top-5" />

                <div className=" mx-auto w-[80%] rounded-lg bg-white px-5 pb-16 pt-10 shadow-lg md:w-full md:max-w-[420px] ">
                    {children}
                </div>
            </main>
        </AuthentcationGuard>
    )
}

export default AuthLayout
