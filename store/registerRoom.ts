import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// 데이터 타입지정
type RegisterRoomState= {
    largeBuildingType:string|null; // 집종류
    buildingType:string|null; // 건물 유형
    roomType:string|null; // 숙소 유형
    isSetUpForGuest:boolean|null; // 게스트용인지
}

// 초기상태
const initialState:RegisterRoomState = {
    // 건물유형 큰 범주
    largeBuildingType:null,
    // 건물유형
    buildingType:null,
    // 숙소유형
    roomType:null,
    // 게스트만을 위해 만들어진 숙소인가
    isSetUpForGuest:null,
}

const registerRoom = createSlice({
    name:"registerRoom",
    initialState,
    reducers:{
        //* 큰 건물 유형 변경하기
        setLargeBuildingType(state, action: PayloadAction<string>) {
            if (action.payload === "") {
            state.largeBuildingType = null;
            }
            state.largeBuildingType = action.payload;
            return state;
        },
        // 건물 유형 변경하기
        setBuildingType(state,action:PayloadAction<string>){
            if(action.payload===""){
                state.buildingType = null;
            }
            state.buildingType  = action.payload;
            return state
        },
        // 숙소 유형 변경하기
        setRoomType(state,action:PayloadAction<"entire"|"private"|"public">){
            state.roomType = action.payload;
            return state;
        }
    }
})

export const registerRoomActions = {...registerRoom.actions}

export default registerRoom