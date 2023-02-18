import { NextApiResponse, NextApiRequest } from "next";
import { ReservedRoomList } from "../../../types/reservation";
import { StoredRoomType } from "../../../types/room";
import Data from './../../../lib/data/index';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // 로그인된 userId의 예약한 숙소 리스트 가져오기
    if (req.method === "GET") {
        const {id} = req.query;
        // userId로 예약리스트에 있는 숙소찾기
        const userIdReservedRooms = Data.reservation.findReservedRoomList(Number(id))        
        
        
        // 예약리스트에 있는 숙소를 찾았으면 해당 숙소들의 id로 숙소 정보를 가져와서 기존 데이터와 합치기
        const reservedRoomsDetail =  userIdReservedRooms.map((room)=>{
           return Data.room.findReservedRoomDetail(room.roomId);
        }) 
        console.log('reservedRoomsDetail',reservedRoomsDetail)

        let reservedRoomList:ReservedRoomList[] = []
        // 필요한 정보만 추출하기
        for(var i =0; i<reservedRoomsDetail.length; i++){
            reservedRoomList.push( {
                ...userIdReservedRooms[i],
                roomType: reservedRoomsDetail[i].roomType,
                photos:reservedRoomsDetail[i].photos,
                bedroomCount:reservedRoomsDetail[i].bedroomCount,
                district:reservedRoomsDetail[i].district,
            });
        }
        console.log('reservedRoomList',reservedRoomList)
        res.statusCode = 200;
        return res.send(reservedRoomList)
    }
    
    // 예약숙소리스트 삭제하기
    if (req.method === "DELETE") {


    }


    res.statusCode = 405;

    return res.end();

}