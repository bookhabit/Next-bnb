import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

// 초기상태
const initialState:CommonState = {
    validateMode:false,
}

const common = createSlice({
    name:"common",
    initialState,
    reducers:{
        // validateMode 변경하기
        setValidateMode(state,action:PayloadAction<boolean>){
            state.validateMode = action.payload;
        }
    }
})

export const commonActions = {...common.actions}
console.log(commonActions)
export default common;