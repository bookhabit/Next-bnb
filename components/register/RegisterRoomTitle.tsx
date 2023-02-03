import React from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import palette from '../../styles/palette';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RegisterRoomFooter from './RegisterRoomFooter';
import { registerRoomActions } from './../../store/registerRoom';

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
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  
`;

const RegisterRoomTitle = () => {
    const title = useSelector((state:any) => state.registerRoom.title);

    const dispatch = useDispatch();
  
    //* 제목 변경시
    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        console.log(event.target.value)
        dispatch(registerRoomActions.setTitle(event.target.value));
    }
      

    return (
        <Container>
            <h2>숙소의 제목을 만들어보세요.</h2>
            <h3>9단계</h3>
            <div className='register-room-title-wrapper'>
                <Input
                    label='숙소의 특징과 장점을 강조하는 제목으로 관심을 끌어보세요.'
                    value={title}
                    onChange={onChangeTitle}
                    isValid={!!title}
                    errorMessage="숙소의 제목을 입력해주세요."
                />
            </div>
            <RegisterRoomFooter
                prevHref='/room/register/description'
                nextHref='/room/register/price'
                isValid={!!title}
            />
        </Container>
    );
};

export default RegisterRoomTitle;