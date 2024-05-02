"use client"

import { Input } from "@/components/form"
import { Button } from "@/components/ui/Button"
import { makeToast } from "@/lib/react-toast"
import { useLoginApi } from "@/services/auth/auth-hooks"
import { authSlice, useAppDispatch } from "@/state_management"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type schemaType = z.infer<typeof schema>

const Login = () => {
    const { handler, loading } = useLoginApi()

    const router = useRouter()

    const dispatch = useAppDispatch()

    const { login } = authSlice.actions

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: schemaType) => {
        const response = await handler(data)

        if (!response || !response.data) return

        makeToast({
            id: "Login-success",
            message: "Logged in Successfully",
            type: "success",
        })

        dispatch(login(response.data))

        router.push("/")
    }

    return (
        <>
            <h2 className="text-center text-lg font-semibold text-[#101010] md:text-2xl ">Welcome Back</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 flex flex-col gap-4">
                <Input
                    required
                    type="email"
                    label="Email Adddress"
                    {...register("email")}
                    name="email"
                    disabled={loading}
                    placeholder="Enter your Email Address"
                    error={errors?.email ? errors.email.message : undefined}
                />

                <Input
                    required
                    label="Password"
                    type="password"
                    {...register("password")}
                    name="password"
                    disabled={loading}
                    placeholder="Enter your Password"
                    error={errors?.password ? errors.password.message : undefined}
                />

                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <span className="text-sm font-light">Remember me</span>
                    </div>

                    <Link
                        href={"/auth/forgot-password"}
                        className="text-primary text-sm font-medium tracking-tight underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button variant="contained" label="Login" loading={loading} type="submit" />
            </form>
        </>
    )
}

export default Login
