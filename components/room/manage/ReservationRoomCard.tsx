import React from 'react';
import { RoomType } from '../../../types/room';
import styled, { css } from "styled-components";
import { ReservedRoomList } from '../../../types/reservation';
import { makeMoneyString, changeDateFormat } from './../../../lib/utils';
import palette from '../../../styles/palette';
import trashIcon from "../../../public/static/svg/room/manage/trash.svg"
import { useMemo } from 'react';

const Container = styled.li`
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:18px;
        font-weight:400;
        text-align:center;
        height:140px;
        border-bottom:1px solid #F2F2F2;
        .remove-btn{
            cursor: pointer;
            color:${palette.gray_80};
        }
        .img-wrapper{
            width:80px;
            height:80px;
            overflow: hidden;
            img {
            width:100%;
            height:100%;
            }
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

      //* 한글로 된 숙소 유형
    const translatedRoomType = useMemo(() => {
        switch (room.roomType) {
        case "entire":
            return "집 전체";
        case "private":
            return "개인실";
        case "public":
            return "공용";
        default:
            return "";
        }
    }, []);

    return (
        <Container>
                <p className='img-wrapper'>
                    <img src={room.photos[0]} alt="" />
                </p>
                <p>{translatedRoomType}</p>
                <p>{room.bedroomCount}</p>
                <p>{room.district}</p>
                <p>{changeDateFormat(checkInDate)}</p>
                <p>{changeDateFormat(checkOutDate)}</p>
                <p>{totalGuestCount}</p>
                <p>{makeMoneyString(String(room.totalPrice))}</p>
                <p className='remove-btn'>삭제</p>
        </Container>
    );
};

export default ReservationRoomCard;