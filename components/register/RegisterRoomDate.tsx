import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import DatePicker from '../common/DatePicker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { registerRoomActions } from './../../store/registerRoom';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-date-wrapper{
    display:flex;
    align-items:center;
    label{
      span{
        display:block;
        margin-bottom:8px;
      }
    }
    input{
      display:block;
      position: relative;
      width:100%;
      height:46px;
      padding: 0 11px;
      border:1px solid ${palette.gray_eb};
      border-radius:4px;
      font-size:16px;
      outline:none;
      &::placeholder{
        color:${palette.gray_76};
      }
      &:focus{
        border-color:${palette.dark_cyan}
      }
    }
    .register-room-start-date{
      margin-right:20px;
    }
  }

`;

const RegisterRoomDate:React.FC = () => {
    const startDate = useSelector((state:any)=>state.registerRoom.startDate)
    const endDate = useSelector((state:any)=>state.registerRoom.endDate)

    // 기간 표시하기
    const dateStartDate = startDate ? new Date(startDate):null;
    const dateEndDate = endDate ? new Date(endDate):null;

    const dispatch = useDispatch();

    // 예약 시작날짜 변경 시
    const onChangeStartDate = (date:Date|null)=>{
      console.log(date)
      dispatch(registerRoomActions.setStartDate(date?date.toISOString():null))
    }

    // 예약 종료 날짜 변경 시
    const onChangeEndDate = (date:Date|null)=>{
      console.log(date)
      dispatch(registerRoomActions.setEndDate(date?date.toISOString():null))
    }

    const validateMode = useSelector((state:any)=>state.common.validateMode)
    return (
        <Container>
            <h2>예약 가능 여부 설정하기</h2>
            <h3>11단계</h3>
            <div className='register-room-date-wrapper'>
              <div className='register-room-start-date'>
                <label>
                  <span>예약 시작일</span>
                  <DatePicker 
                    selected={startDate? new Date(startDate):null}
                    onChange={onChangeStartDate}
                    monthsShown={2}
                    selectsStart
                    startDate={dateStartDate}
                    endDate={dateEndDate}
                    minDate={new Date()}
                    validateMode={validateMode}
                    />
                </label>
              </div>

              <div className='register-room-end-date'>
                  <label>
                    <span>예약 마감일</span>
                    <DatePicker 
                      selected={endDate? new Date(endDate):null}
                      onChange={onChangeEndDate}
                      monthsShown={2}
                      selectsEnd
                      startDate={dateStartDate}
                      endDate={dateEndDate}
                      minDate={dateStartDate}
                      validateMode={validateMode}
                      />
                  </label>
              </div>
            </div>
            
            <RegisterRoomFooter
              prevHref='/room/register/price'
              nextHref='/room/register/checklist'
              isValid={startDate && endDate}
              />
        </Container>
    );
};

export default RegisterRoomDate;