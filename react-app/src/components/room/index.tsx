import React, { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesArray, getRoomMessages } from "../../store/messages";
import { MessageInterface,  StateInterface } from "../../types";
import Chat from "./chat";
import MessageInput from "./messageInput";

const ActiveRoom: FC = (): React.ReactElement => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const dispatch = useDispatch();

    const rooms = useSelector(({ rooms }: StateInterface) => rooms);
    const roomId = rooms.currentRoomId;
    // const messages = useSelector(({ messages }: StateInterface) => messages)
    // const roomMessages = rooms.byId[roomId].message_ids.map((id: number) => messages.byId[id]);



    useEffect(() => {
        (async() => {
            await dispatch(getRoomMessages(roomId));
            setLoaded(true);
        })()
    }, [dispatch, roomId])

    return (
        <>
            {loaded && (
                <div className='room'>
                    <Chat />
                    <div className='chat-input'>
                        <MessageInput />
                    </div>
                </div>
            )}
        </>
    )
}

export default ActiveRoom;
