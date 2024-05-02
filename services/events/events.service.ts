import { API_URL } from "@/constants/api_url"
import { axiosInstance } from "@/lib/axios"
import { IBaseApiResponse } from "../types"
import { Event, EventAttendee, RSVPEventPayload } from "./events.interface"

class EventsService {
    private eventsUrl!: string

    constructor(baseURL: string) {
        this.eventsUrl = `${baseURL}/events`
    }

    public async createEvent(data: FormData) {
        return await axiosInstance.post<IBaseApiResponse<Event>>(`${this.eventsUrl}`, data)
    }

    public async viewEvents() {
        return await axiosInstance.get<IBaseApiResponse<Event[]>>(`${this.eventsUrl}`)
    }

    public async viewEvent(eventId: string) {
        return await axiosInstance.get<IBaseApiResponse<Event>>(`${this.eventsUrl}`, {
            params: {
                eventId,
            },
        })
    }

    public async updateEvent(data: FormData) {
        return await axiosInstance.patch<IBaseApiResponse<Event>>(`${this.eventsUrl}`)
    }

    public async rsvpEvent(data: RSVPEventPayload) {
        return await axiosInstance.post<IBaseApiResponse<EventAttendee>>(`${this.eventsUrl}/rsvp`, data.data, {
            params: {
                eventId: data.query.eventId,
            },
        })
    }

    public async checkInAttendee(token: string) {
        return await axiosInstance.post<IBaseApiResponse<EventAttendee>>(`${this.eventsUrl}/attend`, token)
    }

    public async viewEventAttendees(eventId: string) {
        return await axiosInstance.get<IBaseApiResponse<EventAttendee[]>>(`${this.eventsUrl}/attendees`, {
            params: {
                eventId,
            },
        })
    }

    public async viewEventRegistrations(eventId: string) {
        return await axiosInstance.get<IBaseApiResponse<EventAttendee[]>>(`${this.eventsUrl}/registrations`, {
            params: {
                eventId,
            },
        })
    }
}

export const eventsService = new EventsService(API_URL)
