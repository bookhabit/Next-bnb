import { NextApiResponse, NextApiRequest } from "next";
import isEmpty from "lodash/isEmpty";
import { StoredRoomType } from "../../../types/room";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      limit,
      page = "1",
    } = req.query;
    try {
      console.log(req.query)
      const rooms = await Data.room.getList();

      //* 갯수 자르기
      const limitedRooms = rooms.splice(
        0 + (Number(page) - 1) * Number(limit),
        Number(limit)
      );
      console.log('limitedRooms',limitedRooms)
      //* host 정보 넣기
      const roomsWithHost = await Promise.all(
        limitedRooms.map(async (room) => {
          const host = await Data.user.find({ id: room.hostId });
          return { ...room, host };
        })
      );
      console.log('roomsWithHost',roomsWithHost)
      res.statusCode = 200;
      return res.send(roomsWithHost);
    } catch (e) {
      console.log(e);
    }
  }
  if (req.method === "POST") {
    //? 숙소 등록 하기
    try {
      // req.body로 데이터 가져옴
      const {largeBuildingType,roomType,isSetUpForGuest,maximumGuestCount,bedroomCount,bedCount,bedList,publicBedList,bathroomCount,bathroomType,latitude,longitude,country,city,district,streetAddress,detailAddress,postcode,amentities,conveniences,photos,description,title,price,startDate,endDate} = req.body;
      // 필요한 값이 전부 들어있는지 확인
      if(
        !largeBuildingType||!roomType||!isSetUpForGuest||!maximumGuestCount||!bedroomCount||!bedCount||!bedList||!publicBedList||!bathroomCount||!bathroomType
        ||!latitude||!longitude
        ||!country||!city||!district||!streetAddress||!postcode||!amentities||!conveniences||!photos||!description||!title||!price||!startDate||!endDate
      ){
        res.statusCode=400;
        res.send("필수 값이 업습니다.")
      }

      const rooms = await Data.room.getList();
      if (isEmpty(rooms)) {
        const newRoom: StoredRoomType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.room.write([newRoom]);
        res.statusCode = 201;
        return res.end();
      }

      const newRoom: StoredRoomType = {
        id: rooms[rooms.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Data.room.write([...rooms, newRoom]);
      res.statusCode = 201;
      return res.end();
    } catch (e) {
      console.log(e);
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
