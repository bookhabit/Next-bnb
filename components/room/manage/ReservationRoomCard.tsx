import React from 'react';
import { RoomType } from '../../../types/room';
import styled, { css } from "styled-components";
import { ReservedRoomList } from '../../../types/reservation';
import { makeMoneyString, changeDateFormat } from './../../../lib/utils';
import palette from '../../../styles/palette';
import trashIcon from "../../../public/static/svg/room/manage/trash.svg"

const Container = styled.li`
        display:flex;
        justify-content:space-between;
        font-size:18px;
        font-weight:400;
        text-align:center;
        height:100px;
        border-bottom:1px solid #F2F2F2;
        padding-top:30px;
        .remove-btn{
            cursor: pointer;
            color:${palette.gray_80};
        }
`

interface IProps {
    room: ReservedRoomList;
  }

const ReservationRoomCard:React.FC<IProps> = ({room}) => {
    console.log(room)

    const totalGuestCount = room.adultCount+room.infantsCount+room.childrenCount

    const checkInDate = new Date(room.checkInDate).toLocaleDateString()

    const checkOutDate = new Date(room.checkOutDate).toLocaleDateString()

    return (
        <Container>
                <p>이미지</p>
                <p>침실</p>
                <p>욕실</p>
                <p>위치</p>
                <p>{changeDateFormat(checkInDate)}</p>
                <p>{changeDateFormat(checkOutDate)}</p>
                <p>{totalGuestCount}</p>
                <p>{makeMoneyString(String(room.totalPrice))}</p>
                <p className='remove-btn'>삭제</p>
        </Container>
    );
};

export default ReservationRoomCard;