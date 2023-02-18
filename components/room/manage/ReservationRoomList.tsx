import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import ReservationRoomCard from './ReservationRoomCard';
import axios from '../../../lib/api';
import { useEffect } from 'react';
import { GetReservedRoomAPI } from '../../../lib/api/reservation';
import { useState } from 'react';
import { ReservedRoomList } from '../../../types/reservation';

const Container = styled.div`
    padding:50px 80px;
    margin : auto;
    h1{
        font-size:20px;
        font-weight:800;
    }

    .reserved-room-wrapper{
        width:100%;
        margin-top:40px;
    }

    .reserved-room-column{
        display:flex;
        justify-content:space-between;
        border-bottom:1px solid #F2F2F2;
        padding-bottom:40px;
    }
    .column-name{
        font-size:18px;
        color:${palette.dark_cyan}
    }
    .reserved-room-list{
        width:100%;
        height:auto;
    }
    
`
interface IProps  {
    userId :number
}

const ReservationRoomList:React.FC<IProps> = ({userId}) => {
    // userId를 가지고 예약리스트데이터에서 userId와 일치한 예약리스트 데이터 가져오기 api호출
    const [reservedRooms,setReservedRooms] = useState([])
    const [loading,setLoading] = useState(true)

    const getReservedRoom = async ()=>{
        try{
            const {data} = await GetReservedRoomAPI(userId)
            console.log('응답받은 데이터',data)
            setReservedRooms(data)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        getReservedRoom();
        setLoading(false)
    },[userId])


    return (
        <Container>
            <h1>예약된 숙소 {reservedRooms.length} 개</h1>
            <div className='reserved-room-wrapper'>
                    <li className='reserved-room-column column-name'>
                        <p>이미지</p>
                        <p>침실</p>
                        <p>침대</p>
                        <p>위치</p>
                        <p>체크인 </p>
                        <p>체크아웃</p>
                        <p>인원</p>
                        <p>가격</p>
                        <p>삭제</p>
                    </li>
                <ul className='reserved-room-list'>
                    {loading ? 
                    <h2>데이터를 로딩중입니다</h2>   
                     :
                     reservedRooms?
                        reservedRooms.map((room:ReservedRoomList)=>(
                        <ReservationRoomCard room={room} key={room.id}/>
                    )) :  <h2>예약된 숙소가 없습니다.</h2>
                    }
                    {}
                </ul>
            </div>
        </Container>
    );
};


export default ReservationRoomList;