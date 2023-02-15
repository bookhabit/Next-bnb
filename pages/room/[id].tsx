import { NextPage } from "next";
import { getRoomAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const roomDetail:NextPage = (detail)=>{
    const detailRoom = Object(detail).detailRoom;
    const dispatch = useDispatch();
    const detailRoomState = useSelector((state:any)=>state.room.detail)
    useEffect(()=>{
        dispatch(roomActions.setDetailRoom(detailRoom))
    },[])
    console.log(detailRoomState)
    return <div/>;
}

roomDetail.getInitialProps = async ({query})=>{
    const {id} = query;
    
    let detailRoom;
    try{
        if(id){
            const {data} = await getRoomAPI(Number(id as string));
            detailRoom = data;
        }
    }catch(e){
        console.log(e);
    }
    return {detailRoom}
}

export default roomDetail;