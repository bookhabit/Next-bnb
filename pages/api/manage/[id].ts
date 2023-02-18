import { NextApiResponse, NextApiRequest } from "next";
import Data from './../../../lib/data/index';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const {id} = req.query;
       
        // userId로 예약리스트에 있는 숙소찾기 - reservation.json
        const reservedRoom = Data.reservation.findReservedRoomList(Number(id))
        console.log(reservedRoom,'reservedRoom')
        // 예약리스트에 있는 숙소를 찾았으면 해당 숙소들의 id로 숙소 정보를 가져오기

        res.statusCode = 200;
        return res.send(reservedRoom)
    }
    


    res.statusCode = 405;

    return res.end();

}