import UserType  from "./user";
import { RoomType } from "./room";


// 공통 redux state
export type CommonState = {
    validateMode:boolean;
}

// 유저 redux state
export type UserState = UserType & {
    idLogged:boolean;
}

//* 숙소 검색 redux state
export type SearchRoomState = {
    location: string;
    latitude: number;
    longitude: number;
    checkInDate: string | null;
    checkOutDate: string | null;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
  };
  

// 숙소 redux state
export type RoomState = {
    rooms:RoomType[];
    detail:RoomType | null;
}