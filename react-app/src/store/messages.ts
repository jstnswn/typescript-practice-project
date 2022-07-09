import { ThunkDispatch } from "redux-thunk";
import { MessageInterface } from "../types";
import { normalize } from "./utils";

// const LOAD_CHATS = 'chats/LOAD_CHATS';
const LOAD_ROOM_MESSAGES = 'chats/LOAD_ROOM_MESSAGES';

const loadRoomMessages = (messages: MessageInterface[]) => {
    return {
        type: LOAD_ROOM_MESSAGES,
        messages
    }
}

export const getRoomMessages = (roomId: number) => async (dispatch: ThunkDispatch<void, MessageInterface[], any>) => {
    const res = await fetch(`/api/rooms/${roomId}/messages`);
    const data = await res.json();
    dispatch(loadRoomMessages(data.messages));
}

// Helpers
export const getMessagesArray = (state: any /*TEMP*/) => {
    const selectedRoomId = state.rooms.selectedRoomId;
    const messages = state.rooms.byId[selectedRoomId].message_ids.map((id: number) => {
        return state.messages.byId[id];
    });
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

        default: return state;
    }
}
