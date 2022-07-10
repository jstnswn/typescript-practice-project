import React, { FC, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRoomMessage } from '../../../store/messages';
import { StateInterface } from '../../../types';
import './MessageInput.css';

const MessageInput: FC = (): ReactElement => {
    const [textInput, setTextInput] = useState<string>('');
    const dispatch = useDispatch();
    const roomId = useSelector(({ rooms }: StateInterface) => rooms.currentRoomId)

    const handlePost = (e: any) => {
        e.preventDefault();
        if (textInput.length) {
            dispatch(postRoomMessage({ text: textInput, roomId}));
            setTextInput('');
        }
    };

    return (
        <div>
            <form onSubmit={handlePost} className='message-input'>
                <input
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                />
                <button>post</button>
            </form>
        </div>
    )
}

export default MessageInput;
