export interface RoomInterface {
    id: number,
    name: string,
    message_ids: number[],
}

export interface MessageInterface {
    id: number,
    room_id: number,
    user_id: number,
    text: string
}

export interface PostMessageInterface {
    roomId: number,
    text: string
}

export interface UserInterface {
    email: string,
    id: number,
    username: string
}

export interface stateInterface {
    messages: {
        allIds: number[],
        byId: {
            [key: number]: MessageInterface
        }
    }
    rooms: {
        allIds: number[],
        byId: {
            [key: number]: RoomInterface
        }
        selectedRoomId: number
    },
    session: {
        user: UserInterface
    }
}
