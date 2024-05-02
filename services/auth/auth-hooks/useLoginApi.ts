import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { ILoginRequest, IUser } from "../auth.interface"
import { authService } from "../auth.service"

export const useLoginApi: () => IApiHookBaseResponse<ILoginRequest, IUser> = () => {
    const loginRequest = useApi<IBaseApiResponse<IUser>, ILoginRequest>((data: ILoginRequest) => {
        return authService.signin(data)
    })

    const handleLogin = async (loginDetails: ILoginRequest) => {
        loginRequest.reset()

        return (await loginRequest.request(loginDetails)) as IBaseApiResponse<IUser>
    }

    return {
        handler: handleLogin,
        data: loginRequest.data,
        error: loginRequest.error,
        loading: loginRequest.loading,
    }
}
