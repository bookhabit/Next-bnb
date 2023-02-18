import { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import ReservationRoomList from '../../../components/room/manage/ReservationRoomList';
import { GetReservedRoomAPI } from '../../../lib/api/reservation';


const ReservedRoom:NextPage = () => {
    const userId = useSelector((state:any)=>state.user.id)
    console.log(userId)
    return <ReservationRoomList userId={userId} />
};



export default ReservedRoom;