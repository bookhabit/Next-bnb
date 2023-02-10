import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import differenceInDays from "date-fns/differenceInDays";
import Link from "next/link";
import { RoomType } from "../../../types/room";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import { makeMoneyString } from "../../../lib/utils";

const Container = styled.li`
  width: calc((100% - 48px) / 4);
  &:nth-child(4n) {
    margin-right: 0;
  }
  margin-right: 16px;
  margin-bottom: 32px;

  @media (min-width: 1440px) {
    width: calc((100% - 64px) / 5);
    &:nth-child(4n) {
      margin-right: 16px;
    }
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
  .room-card-photo-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 66.66%;
    margin-bottom: 14px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .room-card-room-info {
    font-size: 12px;
    color: ${palette.gray_71};
    margin-bottom: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .room-card-title {
    font-size: 16px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .room-card-price {
    margin-bottom: 4px;
    b {
      font-weight: 800;
    }
  }
  .room-card-total-price {
    font-size: 14px;
    color: ${palette.gray_71};
  }
  .room-bed-bath-room-info {
    display: none;
  }


`;

interface IProps {
  room: RoomType;
  
}

const RoomCard: React.FC<IProps> = ({ room }) => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const remainDays =
    checkOutDate &&
    checkInDate &&
    differenceInDays(new Date(checkOutDate), new Date(checkInDate));

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
      <Link href={`/room/${room.id}`}>
          <div className="room-card-photo-wrapper">
            <img src={room.photos[0]} alt="" />
          </div>
          <div className="room-card-info-texts">
            <p className="room-card-room-info">
              {room.buildingType} {translatedRoomType} {room.district}{" "}
              {room.city}
            </p>
            <p className="room-card-title">{room.title}</p>
            <div className="room-card-text-divider" />

            <p className="room-card-price">
              <b>₩{room.price} </b>/1박
            </p>
            {!!remainDays && (
              <p className="room-card-total-price">
                총 요금: ₩
                {makeMoneyString(`${Number(room.price) * remainDays}`)}
              </p>
            )}
          </div>
      </Link>
    </Container>
  );
};

export default RoomCard;
