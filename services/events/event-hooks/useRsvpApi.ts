import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { EventAttendee, RSVPEventPayload } from "../events.interface"
import { eventsService } from "../events.service"

export const useRsvpApi: () => IApiHookBaseResponse<RSVPEventPayload, EventAttendee> = () => {
    const rsvpRequest = useApi<IBaseApiResponse<EventAttendee>, RSVPEventPayload>((data: RSVPEventPayload) => {
        return eventsService.rsvpEvent(data)
    })

    const handleRsvp = async (data: RSVPEventPayload) => {
        rsvpRequest.reset()

        return (await rsvpRequest.request(data)) as IBaseApiResponse<EventAttendee>
    }

    return {
        handler: handleRsvp,
        data: rsvpRequest.data,
        error: rsvpRequest.error,
        loading: rsvpRequest.loading,
    }
}
