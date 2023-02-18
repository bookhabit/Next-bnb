import { readFileSync,writeFileSync } from "fs";
import { StoredReservation } from "../../types/reservation";

// 예약리스트 데이터 불러오기
const getList = ()=>{
    const reservationsBuffer = readFileSync('data/reservations.json');
    const reservationString = reservationsBuffer.toString();
    if(!reservationString){
        return []
    }
    const reservations:StoredReservation[] = JSON.parse(reservationString);
    return reservations;
}

// id의 예약이 있는지 확인하기
const exist = (reservationId:number)=>{
    const reservations = getList();
    return reservations.some((room)=>room.id===reservationId)
}

// id의 예약 불러오기
const find = (reservationdId:number)=>{
    const reservations = getList();
    return reservations.find((room)=>room.id===reservationdId)
}

// userId의 예약숙소상세페이지 불러오기
const findReservedRoomList = (userId:number)=>{
    const reservations = getList();
    return reservations.filter((room)=>room.userId===userId)
}


// userId의 예약숙소상세페이지 불러오기
const findReservedRoom = (userId:number)=>{
    const reservations = getList();
    return reservations.find((room)=>room.userId===userId)
}

// 예약 리스트 저장하기
const write = (reservations:StoredReservation[])=>{
    writeFileSync("data/reservations.json",JSON.stringify(reservations))
}

export default {getList,exist,write,find,findReservedRoom,findReservedRoomList}