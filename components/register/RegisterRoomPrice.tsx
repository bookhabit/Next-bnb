import React from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import palette from '../../styles/palette';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RegisterRoomFooter from './RegisterRoomFooter';
import { registerRoomActions } from './../../store/registerRoom';
import { makeMoneyString } from '../../lib/utils';

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
`;
const RegisterRoomPrice = () => {
    const dispatch = useDispatch();

    const price = useSelector((state:any)=>state.registerRoom.price)
    
    //* 금액 변경시
  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    
    const numberPrice = Number(input.replace(/,/g, ""));
    
    //? 인풋 값이 비워지면 price를 0으로 변경
    if (!numberPrice || numberPrice === 0) {
      dispatch(registerRoomActions.setPrice(0));
    }

    if (numberPrice !== 0) {
      dispatch(registerRoomActions.setPrice(numberPrice));
    }
  };

    return (
        <Container>
            <h2>숙소 요금 설정하기</h2>
            <h3>10단계</h3>
            <Input 
                label='기본요금'
                value={makeMoneyString(String(price))}
                onChange={onChangePrice}
                isValid={!!price}
                errorMessage="요금을 지정해주세요"
            />
            <RegisterRoomFooter
                prevHref='/room/register/title'
                nextHref='/room/register/date'
                isValid={!!price}
            />
        </Container>
    );
};

export default RegisterRoomPrice;