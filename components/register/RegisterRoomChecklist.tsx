import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height:100vh;
  .register-room-checklist-info{
    margin-bottom:39px;
  }
  ul{
    display:inline-flex;
    flex-direction:column;
  }
`;

const RegisterRoomChecklist:React.FC = () => {
    const registerRoom = useSelector((state:any)=>state.registerRoom)
    
    // 숙소 유형이 활성화됐는지
    const isBuildingTypeActived = ()=>{
        const {
            largeBuildingType,
            buildingType,
            roomType,
            isSetUpForGuest,
        } = registerRoom;
        if(!largeBuildingType || !buildingType || !roomType || !isSetUpForGuest ){
            return false;
        }
        return true;
    }

    // 침대유형 활성화됐는지
    const isRoomTypeActived = useMemo(()=>{
        const {
            maximumGuestCount,
            bedroomCount,
            bedCount,
            bedList,
            publicBedList
        } = registerRoom;

        if(!maximumGuestCount || !bedroomCount || !bedCount || !bedList || !publicBedList ){
            return false;
        }
        return true;

    },[])

    return (
        <Container>
            <p className='register-room-checklist-info'>
                숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.
            </p>
            <ul>
                <li>숙소 유형</li>
            </ul>
        </Container>
    );
};

export default RegisterRoomChecklist;