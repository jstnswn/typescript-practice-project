import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesArray, getRoomMessages } from '../../../store/messages';
import { MessageInterface, StateInterface } from '../../../types';
import './Chat.css';

const Chat: FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const dispatch = useDispatch();

    const rooms = useSelector(({ rooms }: StateInterface) => rooms);
    const roomId = rooms.currentRoomId;
    const roomMessages = useSelector(getMessagesArray);

    useEffect(() => {
        (async () => {
            await dispatch(getRoomMessages(roomId));
            setLoaded(true);
        })()
    }, [dispatch, roomId])


    return (
        <>
            <div className='chat-wrapper'>
                <ul>
                    {roomMessages.length > 0 && roomMessages.map((message: MessageInterface, idx: number) => (
                        <li key={idx}>{message.text}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Chat;
