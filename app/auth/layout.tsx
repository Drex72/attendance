"use client"

import { NitdaLogo } from "@/public/icons"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative flex h-screen items-center justify-center bg-white">
            <NitdaLogo width={120} height={50} className="absolute left-5 top-5" />

            <div className=" mx-auto w-[80%] rounded-lg bg-white px-5 pb-16 pt-10 shadow-lg md:w-full md:max-w-[500px] ">
                {children}
            </div>
        </main>
    )
}

export default AuthLayout
