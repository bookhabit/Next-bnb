import { readFileSync, writeFileSync } from "fs";
import { StoredRoomType } from "../../types/room";

//* 숙소 리스트 데이터 불러오기
const getList = () => {
  const roomsBuffer = readFileSync("data/rooms.json");
  const roomsString = roomsBuffer.toString();
  if (!roomsString) {
    return [];
  }
  const rooms: StoredRoomType[] = JSON.parse(roomsString);
  return rooms;
};

//* id의 숙소 있는지 확인하기
const exist = (roomId: number) => {
  const rooms = getList();
  return rooms.some((room) => room.id === roomId);
};

//* id의 숙소 불러오기
const find = (roomId: number) => {
  const rooms = getList();
  return rooms.find((room) => room.id === roomId);
};

//* 숙소 리스트 저장하기
const write = (rooms: StoredRoomType[]) => {
  writeFileSync("data/rooms.json", JSON.stringify(rooms));
};

// 예약숙소리스트에 해당하는 id의숙소정보 불러오기
const findReservedRoomDetail = (roomId:number)=>{
  console.log('findReservedRoomDetail roomId',roomId)
  const rooms = getList();
  return rooms.find((room)=>room.id===roomId) as StoredRoomType
}


export default { getList, exist, write, find,findReservedRoomDetail };
