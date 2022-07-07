// const LOAD_CHATS = 'chats/LOAD_CHATS';
const LOAD_CHAT = 'chats/LOAD_CHAT';


const initialState = {
    rooms: {},
    byId: {}
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_CHAT:
            return {...state}
    }
}
