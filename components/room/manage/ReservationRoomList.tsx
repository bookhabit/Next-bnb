import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { RoomType } from '../../../types/room';
import ReservationRoomCard from './ReservationRoomCard';

const Container = styled.div`
    padding:50px 80px;
    margin : auto;

    h1{
        font-size:20px;
        font-weight:800;
    }

    .reserved-room-wrapper{
        width:80vw;
        margin-top:40px;
        padding-bottom:15px;
        border-bottom:1px solid #F2F2F2
    }

    .reserved-room-column{
        display:flex;
        justify-content:space-between
    }
    .column-name{
        font-size:18px;
        color:${palette.dark_cyan}
    }
`

const ReservationRoomList:React.FC = () => {
    const user = useSelector((state:any)=>state.user)
    console.log(user)
    // userId를 가지고 예약리스트데이터에서 userId와 일치한 예약리스트 데이터 가져오기 api호출
    const rooms = useSelector((state:any) => state.room.rooms);
    console.log(rooms)
    return (
        <Container>
            <h1>예약된 숙소 몇 개</h1>
            <div className='reserved-room-wrapper'>
                <ul>
                    <li className='reserved-room-column column-name'>
                        <p>이미지</p>
                        <p>침실</p>
                        <p>욕실</p>
                        <p>위치</p>
                        <p>최종 수정일</p>
                        <p>체크인 날짜</p>
                        <p>체크아웃날짜</p>
                        <p>인원</p>
                        <p>가격</p>
                    </li>
                    {rooms.map((room:RoomType)=>(
                        <ReservationRoomCard room={room} key={room.id}/>
                    ))}
                </ul>
            </div>
        </Container>
    );
};

export default ReservationRoomList;