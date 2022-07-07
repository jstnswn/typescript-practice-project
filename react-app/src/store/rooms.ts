import { ThunkDispatch } from "redux-thunk";

const LOAD_ROOMS = 'rooms/LOAD_ROOMS';

interface Rooms {
    room_id: number,
    name: string
}

const loadRooms = (rooms:Rooms) => {
    return {
        type: LOAD_ROOMS,
        rooms
    }
}


const getRooms = (payload:any) => async (dispatch:any) => {
    const res = await fetch('/api/rooms');
    const rooms = await res.json();

    dispatch(loadRooms(rooms));
}

console.log(getRooms);

const initialState = {
    rooms: {},
    byId: {}
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_ROOMS:
            return {...state, ...action.rooms};
    }
}
