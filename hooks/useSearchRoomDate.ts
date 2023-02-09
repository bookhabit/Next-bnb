
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { searchRoomActions } from './../store/searchRoom';


const useSearchRoomDate = ()=>{
    const checkInDate = useSelector((state:any)=>state.searchRoom.checkInDate)
    const checkOutDate = useSelector((state:any)=>state.searchRoom.checkOutDate)

    const dispatch = useDispatch();

    // 체크인 날짜 변경 Dispatch
    const setCheckInDateDispatch = (date:Date|null)=>{
        if(date){
            dispatch(searchRoomActions.setStartDate(date.toISOString()))
        }else{
            dispatch(searchRoomActions.setStartDate(null))
        }
    }

    // 체크아웃 날짜 변경 Dispatch
    const setCheckOutDateDispatch = (date:Date|null)=>{
        if(date){
            dispatch(searchRoomActions.setEndDate(date.toISOString()))
        } else{
            dispatch(searchRoomActions.setStartDate(null))
        }
    }


    return {
        checkInDate : checkInDate ? new Date(checkInDate) : null ,
        checkOutDate : checkOutDate ? new Date(checkOutDate) : null ,
        setCheckInDateDispatch,setCheckOutDateDispatch
    }
}

export default useSearchRoomDate;