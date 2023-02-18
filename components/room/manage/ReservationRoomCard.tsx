import React from 'react';
import { RoomType } from '../../../types/room';
import styled, { css } from "styled-components";
import { ReservedRoomList } from '../../../types/reservation';
import { makeMoneyString, changeDateFormat } from './../../../lib/utils';

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

    const checkInDate = new Date(room.checkInDate).toLocaleDateString()

    const checkOutDate = new Date(room.checkOutDate).toLocaleDateString()

    const updatedAt = new Date(room.updatedAt).toLocaleDateString()

    return (
        <Container>
                <p>이미지</p>
                <p>침실</p>
                <p>욕실</p>
                <p>위치</p>
                <p>{changeDateFormat(updatedAt)}</p>
                <p>{changeDateFormat(checkInDate)}</p>
                <p>{changeDateFormat(checkOutDate)}</p>
                <p>{totalGuestCount}</p>
                <p>{makeMoneyString(String(room.totalPrice))}</p>
        </Container>
    );
};

export default ReservationRoomCard;