import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "../types/reduxState";
import { RoomType } from "../types/room";

//* 초기 상태
const initialState: RoomState = {
  rooms: [],
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    // 숙소 리스트들
    setRooms(state, action: PayloadAction<RoomType[]>) {
      state.rooms = action.payload;
      return state;
    },

  },
});

export const roomActions = { ...room.actions };

export default room;
