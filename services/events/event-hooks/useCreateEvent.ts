import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { Event } from "../events.interface"
import { eventsService } from "../events.service"

export const useCreateEvent: () => IApiHookBaseResponse<FormData, Event> = () => {
    const createEventRequest = useApi<IBaseApiResponse<Event>, FormData>((data: FormData) => {
        return eventsService.createEvent(data)
    })

    const handleCreateEvent = async (data: FormData) => {
        createEventRequest.reset()

        return (await createEventRequest.request(data)) as IBaseApiResponse<Event>
    }

    return {
        handler: handleCreateEvent,
        data: createEventRequest.data,
        error: createEventRequest.error,
        loading: createEventRequest.loading,
    }
}
