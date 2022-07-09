import React, { FC, useState, useEffect } from 'react';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms, getRoomsArray, selectRoom } from '../store/rooms';
import { RoomInterface } from '../types';

// interface Props {
//     roomId: number
// }

const Rooms: FC = (): React.ReactElement => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        (async() => {
            await dispatch(getRooms());
            setLoaded(true);
        })()
    },[dispatch]);

    const rooms: RoomInterface[] = useSelector(getRoomsArray);

    const handleRoomClick = (roomId: number) => {
        dispatch(selectRoom(roomId))
    }


    return (
        <>
            {loaded && (
                <div className='rooms-list'>
                    <h2>Rooms</h2>
                    {rooms.map((room: any, idx: number) => (
                        <li key={idx} onClick={() => handleRoomClick(room.id)}>{room.name}</li>
                    ))}
                </div>
            )}
        </>
    )
};

export default Rooms;
