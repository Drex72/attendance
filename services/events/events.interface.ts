interface CreateEventRequestPayload {
    name: string
    description: string
    limit: number
    date: string
    time: string
}

export interface Event {
    id: string
    name: string
    description: string
    photo: string
    limit: number | null
    inviteLink: string
    inviteQrCode: string
    date: string
    time: string
}

export interface EventAttendee {
    id: string
    eventId: string
    status: "registered" | "attended"
    userId: string
    qrCode: string
    entryTime: string | null
}

export interface RSVPEventPayload {
    query: {
        eventId: string
    }

    data: {
        firstName: string
        lastName: string
        email: string
        phoneNumber?: string
    }
}
