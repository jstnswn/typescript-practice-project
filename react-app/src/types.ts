export interface RoomInterface {
    id: number,
    name: string,
    message_ids: number[]
}

export interface MessageInterface {
    id: number,
    room_id: number,
    user_id: number,
    text: string
}

