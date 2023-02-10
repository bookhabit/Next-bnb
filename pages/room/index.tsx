import React from 'react';
import { NextPage } from 'next';
import { wrapper } from '../../store';
import RoomMain from '../../components/room/main/RoomMain';
import { getRoomListAPI } from '../../lib/api/room';
import { roomActions } from './../../store/room';

const index:NextPage = (query) => {
    return <RoomMain/>
};

index.getInitialProps = async ({store,query})=>{
    console.log('store:',store)
    const {
        checkInDate,
        checkOutDate,
        adultCount,
        childrenCount,
        latitude,
        longitude,
        limit,
        page = "1",
      } = query;
      
      try {
        const { data } = await getRoomListAPI({
          checkInDate,
          checkOutDate,
          adultCount,
          childrenCount,
          latitude,
          longitude,
          limit: limit || "20",
          page: page || "1",
          //? 한글은 encode해주세요.
          location: query.location
            ? encodeURI(query.location as string)
            : undefined,
        });
        console.log('숙소리스트 api로 가져온 숙소리스트',data)
        store.dispatch(roomActions.setRooms(data));
      } catch (e) {
        console.log(e);
      }
      return {query}
}


export default index;