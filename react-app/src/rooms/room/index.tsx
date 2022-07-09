import React, { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesArray, getRoomMessages } from "../../store/messages";
import { MessageInterface, RoomInterface } from "../../types";

interface Props {
    roomId: number
}

const ActiveRoom: FC<Props> = ({ roomId }): React.ReactElement => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const dispatch = useDispatch();
    // const room: RoomInterface = useSelector(({ rooms }:any) => rooms.byId[roomId]);
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
                    <div className='message'>
                        <ul>
                            {messages.map((message: MessageInterface, idx: number) => (
                                <li key={idx}>{message.text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default ActiveRoom;
