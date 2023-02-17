import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import SearchRoomBar from './searchRoomBar/SearchRoomBar';


const Container = styled.div`
  width: 100%;
  padding: 0 80px;

  .home-search-bar-label {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 20px;
  }
  h2 {
    width: 600px;
    margin: 80px 0 60px;
    font-size: 50px;
    color: ${palette.cardinal};
  }
  h3 {
    width: 600px;
    margin: 80px 0 60px;
    font-size: 50px;
    color: ${palette.davidson_orange};
  }
  .home-wrapper{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
`
const Home = () => {
    return (
        <Container>
            <p className='home-search-bar-label'>숙소</p>
            <SearchRoomBar/>
            <div className='home-wrapper'>
              <h2>가까운 여행지 ,<br/> 에어비앤비와 탐험해보세요.</h2>
              <Link href="room/register/building">
                <h3>숙소 등록하기</h3>
              </Link>
            </div>
        </Container>
    );
};

export default Home;