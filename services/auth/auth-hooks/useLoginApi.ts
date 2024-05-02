import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { ILoginRequest, IUser } from "../auth.interface"
import { authService } from "../auth.service"

export const useLoginApi: () => IApiHookBaseResponse<
    ILoginRequest,
    { user: IUser; tokens: { accessToken: string; refreshToken: string } }
> = () => {
    const loginRequest = useApi<
        IBaseApiResponse<{ user: IUser; tokens: { accessToken: string; refreshToken: string } }>,
        ILoginRequest
    >((data: ILoginRequest) => {
        return authService.signin(data)
    })

    const handleLogin = async (loginDetails: ILoginRequest) => {
        loginRequest.reset()

        return (await loginRequest.request(loginDetails)) as IBaseApiResponse<{
            user: IUser
            tokens: { accessToken: string; refreshToken: string }
        }>
    }

    return {
        handler: handleLogin,
        data: loginRequest.data,
        error: loginRequest.error,
        loading: loginRequest.loading,
    }
}
