import React, { FC, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRoomMessage } from '../../store/messages';
import { stateInterface } from '../../types';

const MessageInput: FC = (): ReactElement => {
    const [textInput, setTextInput] = useState<string>('');
    const dispatch = useDispatch();
    const roomId = useSelector(({ rooms }: stateInterface) => rooms.selectedRoomId)

    const handlePost = (e: any) => {
        e.preventDefault();
        console.log('click')
        if (textInput.length) {
            dispatch(postRoomMessage({ text: textInput, roomId}));
            setTextInput('');
        }
    }


    return (
        <div>
            <form onSubmit={handlePost}>
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
