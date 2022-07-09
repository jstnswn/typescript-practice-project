import React, { FC, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

const MessageInput: FC = (): ReactElement => {
    const [textInput, setTextInput] = useState<string>('');
    const dispatch = useDispatch();

    const handlePost = (e: any) => {
        e.preventDefault();
        if (textInput.length) {
            // dispatch post
        }
    }


    return (
        <div>
            <input
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
            />
            <button onClick={handlePost}>post</button>
        </div>
    )
}

export default MessageInput;
