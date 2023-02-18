import { NextApiResponse, NextApiRequest } from "next";
import { ReservedRoomList } from "../../../types/reservation";
import Data from './../../../lib/data/index';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // 로그인된 userId의 예약한 숙소 리스트 가져오기
    if (req.method === "GET") {
        const {id} = req.query;
        // userId로 예약리스트에 있는 숙소찾기
        const userIdReservedRooms = Data.reservation.findReservedRoomList(Number(id))
        
        // 예약리스트에 있는 숙소를 찾았으면 해당 숙소들의 id로 숙소 정보를 가져와서 기존 데이터와 합치기
        const reservedRoomsDetail =  userIdReservedRooms.map((room)=>{
           return Data.room.findReservedRoomList(room.roomId);
        }) 
        // 필요한 정보만 추출하기
        // const DetailInfo =  reservedRoomsDetail.filter((room)=>{
        //     return Object
        // })
        console.log('reservedRoomsDetail',reservedRoomsDetail)
        // const reservedRoomList:ReservedRoomList = {
        //     ...userIdReservedRooms,
            
        //   };


        res.statusCode = 200;
        return res.send(userIdReservedRooms)
    }
    


    res.statusCode = 405;

    return res.end();

}