import React, { FC, useState, useEffect } from 'react';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms, getRoomsArray, selectRoom } from '../../store/rooms';
import { RoomInterface } from '../../types';
import RoomsList from './roomsList';
import './Sidebar.css';


// interface Props {
//     roomId: number
// }

const SideBar: FC = (): React.ReactElement => {
    return (
        <div id='sidebar'>
            <RoomsList />
        </div>
    )
};

export default SideBar;
