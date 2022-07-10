import { ThunkDispatch } from "redux-thunk";
import { MessageInterface, PostMessageInterface } from "../types";
import { addRoomMessageId } from "./rooms";
import { normalize } from "./utils";

// const LOAD_CHATS = 'chats/LOAD_CHATS';
const LOAD_ROOM_MESSAGES = 'chats/LOAD_ROOM_MESSAGES';
const LOAD_ROOM_MESSAGE = 'chats/LOAD_ROOM_MESSAGE';

const loadRoomMessages = (messages: MessageInterface[]) => {
    return {
        type: LOAD_ROOM_MESSAGES,
        messages
    }
};

const loadRoomMessage = (message: MessageInterface) => {
    return {
        type: LOAD_ROOM_MESSAGE,
        message
    }
};

export const getRoomMessages = (roomId: number) => async (dispatch: ThunkDispatch<void, MessageInterface[], any>) => {
    const res = await fetch(`/api/rooms/${roomId}/messages`);
    const data = await res.json();
    dispatch(loadRoomMessages(data.messages));
}

export const postRoomMessage = (payload: PostMessageInterface) => async (dispatch: any) => {
    const { roomId: room_id, text } = payload
    const res = await fetch('/api/messages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_id, text })
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(loadRoomMessage(data.message));
        dispatch(addRoomMessageId(room_id, data.message.id));
    }
}

// Helpers
export const getMessagesArray = (state: any /*TEMP*/) => {
    const selectedRoomId = state.rooms.selectedRoomId;
    const messages = state.rooms.byId[selectedRoomId].message_ids.map((id: number) => {
        return state.messages.byId[id];
    });

    if (messages.length && messages[0] === undefined) return [];
    return messages;
}
const initialState = {
    byId: {
        1: {
            id: 1,
            room_id: 1,
            user_id: 1,
            text: ''
        }
    },
    allIds: []
}

export default function messages(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_ROOM_MESSAGES:
            const normalData = normalize(action.messages);
            return {
                ...state,
                byId: {...state.byId, ...normalData},
                allIds: action.messages.map((message: MessageInterface) => message.id)
            }

        case LOAD_ROOM_MESSAGE:
            return {
                byId: {...state.byId, [action.message.id]: action.message},
                allIds: [...state.allIds, action.message.id]
            }

        default: return state;
    }
}
