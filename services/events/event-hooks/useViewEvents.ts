import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { Event } from "../events.interface"
import { eventsService } from "../events.service"

export const useViewEvents: () => IApiHookBaseResponse<undefined, Event[]> = () => {
    const viewEventsRequest = useApi<IBaseApiResponse<Event[]>, undefined>(() => {
        return eventsService.viewEvents()
    })

    const handleViewEvents = async () => {
        viewEventsRequest.reset()

        return (await viewEventsRequest.request()) as IBaseApiResponse<Event[]>
    }

    return {
        handler: handleViewEvents,
        data: viewEventsRequest.data,
        error: viewEventsRequest.error,
        loading: viewEventsRequest.loading,
    }
}
