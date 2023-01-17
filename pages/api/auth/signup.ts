import { NextApiRequest,NextApiResponse } from "next";

export default async (req:NextApiRequest,res:NextApiResponse)=>{
    if(req.method==="POST"){
        const {email,firstname,lastname,password,birthday} = req.body;
        // req.body의 값이 유효한지 확인하기
        if(!email||!firstname||!lastname||!password||!birthday){
            res.statusCode = 400;
            return res.send("필수 데이터가 없습니다.")
        }
        return res.end();
    }
    res.statusCode=405;

    return res.end();
}