import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Selector from '../common/Selector';
import { largeBuildingTypeList } from '../../lib/staticData';
import { registerRoomActions } from './../../store/registerRoom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import RadioGroup from '../common/RadioGroup';

const Container = styled.div`
    padding:62px 30px 100px;
    h2{
        font-size:19px;
        font-weight:800;
        margin-bottom:56px;
    }
    h3{
        font-weight:bole;
        color:${palette.gray_76};
        margin-bottom:6px;
    }
    .register-room-building-selector-wrapper{
        width:320px;
        margin-bottom:32px;
    }
    .register-room-room-type-radio{
      max-width:485px;
      margin-bottom:50px;
    }

`

// 선택 불가능한 큰 범위 건물 유형
const disabledlargeBuildingTypeOptions = ["하나를 선택해주세요."];

//* 숙소유형 radio options
const roomTypeRadioOptions = [
  {
    label: "집 전체",
    value: "entire",
    description:
      "게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.",
  },
  {
    label: "개인실",
    value: "private",
    description:
      "게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다.",
  },
  {
    label: "다인실",
    value: "public",
    description:
      "게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용 공간에서 숙박합니다.",
  },
];

const RegisterRoomBuilding:React.FC = () => {
    const largeBuildingType = useSelector((state:any)=>state.registerRoom.largeBuildingType);

    const buildingType = useSelector((state:any)=>state.registerRoom.buildingType)

    const roomType = useSelector((state:any)=>state.roomType)

    const dispatch = useDispatch();

    // 큰 범위 건물 유형 변경 시 
    const onChangeLargeBuildingType = (
        event:React.ChangeEvent<HTMLSelectElement>
    )=>{
        dispatch(registerRoomActions.setLargeBuildingType(event.target.value))
    }
    // 상세 건물 유형 변경 시 
    const onChangeBuildingType = (
        event:React.ChangeEvent<HTMLSelectElement>
    )=>{
        dispatch(registerRoomActions.setBuildingType(event.target.value))
    }    

    
    //* 숙소 유형 변경시
    const onChangeRoomType = (value: any) => {
      dispatch(registerRoomActions.setRoomType(value));
    };

      //* 선택된 건물 유형 options
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "아파트": {
        const {
          apartmentBuildingTypeList,
        } = require("../../lib/staticData");
        dispatch(
          registerRoomActions.setBuildingType(apartmentBuildingTypeList[0])
        );
        return apartmentBuildingTypeList;
      }
      case "주택": {
        const { houstBuildingTypeList } = require("../../lib/staticData");
        dispatch(registerRoomActions.setBuildingType(houstBuildingTypeList[0]));
        return houstBuildingTypeList;
      }
      case "별채": {
        const {
          secondaryUnitBuildingTypeList,
        } = require("../../lib/staticData");
        dispatch(
          registerRoomActions.setBuildingType(secondaryUnitBuildingTypeList[0])
        );
        return secondaryUnitBuildingTypeList;
      }
      case "독특한 숙소": {
        const {
          uniqueSpaceBuildingTypeList,
        } = require("../../lib/staticData");
        dispatch(
          registerRoomActions.setBuildingType(uniqueSpaceBuildingTypeList[0])
        );
        return uniqueSpaceBuildingTypeList;
      }
      case "B&B": {
        const { bnbBuildingTypeList } = require("../../lib/staticData");
        dispatch(registerRoomActions.setBuildingType(bnbBuildingTypeList[0]));
        return bnbBuildingTypeList;
      }
      case "부티크호텔": {
        const {
          boutiquesHotelBuildingTypeList,
        } = require("../../lib/staticData");
        dispatch(
          registerRoomActions.setBuildingType(boutiquesHotelBuildingTypeList[0])
        );
        return boutiquesHotelBuildingTypeList;
      }
      default:
        return ["아파트"];
    }
  }, [largeBuildingType]);

    console.log('roomType',roomType)
    console.log('buildingType',buildingType)

    return (
        <Container>
            <h2>등록할 숙소 종류는 무엇인가요?</h2>
            <h3>1단계</h3>
            <div className='register-room-building-selector-wrapper'>
                <Selector
                    type='register'
                    value={largeBuildingType||undefined}
                    disabledOptions={disabledlargeBuildingTypeOptions}
                    label="우선 범위를 좁혀볼까요?"
                    options={largeBuildingTypeList}
                    onChange={onChangeLargeBuildingType}/>
            </div>
            <div className="register-room-building-selector-wrapper">
                <Selector
                type="register"
                value={buildingType || undefined}
                onChange={onChangeBuildingType}
                disabled={!largeBuildingType}
                label="건물 유형을 선택하세요."
                options={detailBuildingOptions}
                />
            </div>
            {buildingType&&(
              <div className='register-room-room-type-radio'>
                <RadioGroup
                  label='게스트가 묵게 될 숙소 유형을 골라주세요.'
                  value={roomType||undefined}
                  options={roomTypeRadioOptions}
                  onChange={onChangeRoomType}
                  />
              </div>
            )}
        </Container>
    );
};

export default RegisterRoomBuilding;