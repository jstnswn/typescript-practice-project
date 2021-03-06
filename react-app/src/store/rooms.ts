import { Dispatch } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RoomInterface } from "../types";
import { normalize } from "./utils";

const LOAD_ROOMS = 'rooms/LOAD_ROOMS';
const SELECT_ROOM = 'rooms/SELECT_ROOM';
const ADD_ROOM_MESSAGE_ID = 'rooms/ADD_ROOM_MESSAGE_ID';

const loadRooms = (rooms: RoomInterface[]) => {
    return {
        type: LOAD_ROOMS,
        rooms
    }
}

export const selectRoom = (roomId: number) => {
    return {
        type: SELECT_ROOM,
        roomId
    }
}

export const addRoomMessageId = (roomId: number, messageId: number) => {
    return {
        type: ADD_ROOM_MESSAGE_ID,
        roomId,
        messageId
    }
}

export const getRooms = () => async (dispatch: ThunkDispatch<void, RoomInterface[], any>) => {
    const res = await fetch('/api/rooms/');
    const data = await res.json();
    dispatch(loadRooms(data.rooms));
}


// export const selectRoom

const initialState = {
    byId: {
        1: {
            id: 1,
            name: '',
            message_ids: [/*messageIds*/],
        }
    },
    allIds: [],
    currentRoomId: 1
}

// Helpers
export const getRoomsArray = (state: any /*TEMP*/) => {
    const orderedIds = state.rooms.allIds;
    return orderedIds.map((id: number) => state.rooms.byId[id]);
}

let stateCopy: any;
export default function rooms(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_ROOMS:
            const normalData = normalize(action.rooms);
            return {
                ...state,
                byId: { ...state.byId, ...normalData },
                allIds: action.rooms.map((room: RoomInterface) => room.id)
            }

        case SELECT_ROOM:
            return { ...state, currentRoomId: action.roomId }

        case ADD_ROOM_MESSAGE_ID:
            stateCopy = { ...state };
            stateCopy.byId[action.roomId].message_ids.push(action.messageId);
            return stateCopy;

        default: return state;
    }
}
