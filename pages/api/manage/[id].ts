import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const {id} = req.query;
        console.log('req.query',req.query)
        console.log('서버에서 쿼리로 받은 userId:',id)

        // userId로 예약리스트에 있는 숙소찾기 - reservation.json


        // 예약리스트에 있는 숙소를 찾았으면 해당 숙소들의 id로 숙소 정보를 가져오기

        res.statusCode = 200;
        return res.send("서버 연결성공")
    }
    


    res.statusCode = 405;

    return res.end();

}