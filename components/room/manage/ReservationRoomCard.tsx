import React from 'react';
import { RoomType } from '../../../types/room';
import styled, { css } from "styled-components";

const Container = styled.li`

`

interface IProps {
    room: RoomType;
  }

const ReservationRoomCard:React.FC<IProps> = ({room}) => {
    console.log(room)
    return (
        <Container>
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
        </Container>
    );
};

export default ReservationRoomCard;