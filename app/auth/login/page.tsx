"use client"

import { Input } from "@/components/form"
import { Button } from "@/components/ui/Button"
import { makeToast } from "@/lib/react-toast"
import GoogleIcon from "@/public/images/google.png"
import { useLoginApi } from "@/services/auth/auth-hooks"
import { authSlice, useAppDispatch } from "@/state_management"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { MdOutlineEmail } from "react-icons/md"
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

        dispatch(login(response.data.user))

        localStorage.setItem("accessToken", response.data.tokens.accessToken)

        router.push("/events")
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className=" mt-7 flex flex-col gap-4">
                <div className="mx-auto space-y-6">
                    <div className="mb-4 text-center">
                        <h1 className="text-[28px] font-semibold text-[#101928]">Log In</h1>

                        <p className="text-sm text-[#667185] dark:text-gray-400">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Input
                            required
                            type="email"
                            label="EMAIL ADDRESS"
                            name="email"
                            register={register}
                            disabled={loading}
                            placeholder="Enter your Email Address"
                            error={errors?.email ? errors.email.message : undefined}
                            prefixIcon={
                                <div className="my-auto cursor-pointer pe-4">
                                    <MdOutlineEmail />
                                </div>
                            }
                        />

                        <Input
                            required
                            label="PASSWORD"
                            type="password"
                            name="password"
                            register={register}
                            disabled={loading}
                            placeholder="Enter your Password"
                            error={errors?.password ? errors.password.message : undefined}
                        />

                        <div className="mobile_lg:gap-12 mt-5 flex w-full items-center justify-between gap-20 pb-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" />
                                <label htmlFor="" className="text-sm font-semibold">
                                    Remember me for 30 days
                                </label>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[#099137]">Forget Password?</p>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            label="Log into Account"
                            loading={loading}
                            type="submit"
                            className="w-full"
                        />

                        <div className="relative flex w-full items-center justify-center py-2 text-[#667185] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-[45%] before:bg-[#F0F2F5] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-[45%] after:bg-[#F0F2F5]">
                            or
                        </div>

                        <Button
                            variant="outlined"
                            label={
                                <div className="flex w-full items-center justify-center gap-3">
                                    <Image src={GoogleIcon} width={20} height={20} alt="Google Icon" />
                                    <span>Sign in with Google</span>
                                </div>
                            }
                            type="button"
                            className="w-full"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login
