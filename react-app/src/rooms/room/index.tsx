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
    // const messages = useSelector(({ messages }: stateInterface) => messages)
    // const roomMessages = rooms.byId[roomId].message_ids.map((id: number) => messages.byId[id]);

    const roomMessages = useSelector(getMessagesArray);

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
                            {roomMessages.length > 0 && roomMessages.map((message: MessageInterface, idx: number) => (
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
