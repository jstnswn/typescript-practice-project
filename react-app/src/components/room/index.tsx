import React, { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesArray, getRoomMessages } from "../../store/messages";
import { MessageInterface,  StateInterface } from "../../types";
import Chat from "./chat";
import MessageInput from "./messageInput";
import './Room.css';

const ActiveRoom: FC = (): React.ReactElement => {

    // const messages = useSelector(({ messages }: StateInterface) => messages)
    // const roomMessages = rooms.byId[roomId].message_ids.map((id: number) => messages.byId[id]);




    return (
        <div className='room'>
            <Chat />
            <div className='chat-input'>
                <MessageInput />
            </div>
        </div>
    )
}

export default ActiveRoom;
