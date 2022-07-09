import React, { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesArray, getRoomMessages } from "../../store/messages";
import { MessageInterface,  stateInterface } from "../../types";
import MessageInput from "./MessageInput";

const ActiveRoom: FC = (): React.ReactElement => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const dispatch = useDispatch();
    const rooms = useSelector(({ rooms }: stateInterface) => rooms);
    const roomId = rooms.selectedRoomId;
    const messages = useSelector(getMessagesArray);

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
                    <h2>Chat</h2>
                    <div className='room-messages'>
                        <ul>
                            {messages.length > 0 && messages.map((message: MessageInterface, idx: number) => (
                                <li key={idx}>{message.text}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='chat-input'>
                        <MessageInput />
                    </div>
                </div>
            )}
        </>
    )
}

export default ActiveRoom;
