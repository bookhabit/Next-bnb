import axios from ".";
import { RoomType } from "../../types/room";

type MakeReservationAPIBody = {
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
};

//* 숙소 예약하기
export const makeReservationAPI = (body: MakeReservationAPIBody) =>
  axios.post("/api/reservations", body);


// 예약된 숙소리스트 불러오기
export const GetReservedRoomAPI = (userId:number) =>
  axios.get(`/api/manage/${userId}`);
