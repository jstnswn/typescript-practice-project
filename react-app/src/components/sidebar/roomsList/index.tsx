import React, { FC, useState, useEffect } from 'react';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms, getRoomsArray, selectRoom } from '../../../store/rooms';
import { RoomInterface, StateInterface } from '../../../types';
import './RoomsList.css';

const RoomsList: FC = (): React.ReactElement => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getRooms());
            setLoaded(true);
        })()
    }, [dispatch]);

    const roomsState = useSelector(({ rooms }: StateInterface) => rooms);
    const isCurrentRoom = (currRoomId: number, activeRoomId: number) => currRoomId === activeRoomId;
    // Bellow is redundant when using roomState to get current room.
    // Find cleaner way to toggle active
    const rooms: RoomInterface[] = useSelector(getRoomsArray);

    const handleRoomClick = (roomId: number) => {
        dispatch(selectRoom(roomId))
    }


    return (
        <>
            {loaded && (
                <div id='sidebar'>
                    <div className='rooms-list'>
                        <h2>Rooms</h2>
                        {rooms.map((room: any, idx: number) => (
                            <li className={`room-selection ${isCurrentRoom(room.id, roomsState.currentRoomId) ? 'active' : ''}`} key={idx} onClick={() => handleRoomClick(room.id)}>{room.name}</li>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
};

export default RoomsList;
