import React from 'react';
import { RoomType } from '../../../types/room';
import styled, { css } from "styled-components";
import { ReservedRoomList } from '../../../types/reservation';

const Container = styled.li`
        display:flex;
        justify-content:space-between;
`

interface IProps {
    room: ReservedRoomList;
  }

const ReservationRoomCard:React.FC<IProps> = ({room}) => {
    console.log(room)

    const totalGuestCount = room.adultCount+room.infantsCount+room.childrenCount

    return (
        <Container>
                <p>이미지</p>
                <p>침실</p>
                <p>욕실</p>
                <p>위치</p>
                <p>{room.updatedAt}</p>
                <p>{room.checkInDate}</p>
                <p>{room.checkOutDate}</p>
                <p>{totalGuestCount}</p>
                <p>가격</p>
        </Container>
    );
};

export default ReservationRoomCard;