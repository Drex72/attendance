import { CustomProvider } from "@/utils"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "../styles/globals.css"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        template: "%s | APPLICATION_NAME",
        default: "APPLICATION_NAME",
    },
    description: "APPLICATION_DESC",
    applicationName: "APPLICATION_NAME",
    authors: [{ name: "Nithub", url: "https://nithub.unilag.edu.ng" }],
    generator: "Nithub",
    referrer: "origin-when-cross-origin",
    creator: "Nithub",
    publisher: "Nithub",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body >
                <CustomProvider>{children}</CustomProvider>
            </body>
        </html>
    )
}
