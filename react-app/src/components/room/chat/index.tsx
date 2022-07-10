import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesArray } from '../../../store/messages';
import { MessageInterface } from '../../../types';
import './Chat.css';

const Chat: FC = () => {
    const roomMessages = useSelector(getMessagesArray);

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
