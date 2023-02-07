import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Button from '../common/Button';
import NavigationIcon from "../../public/static/svg/register/navigation.svg";
import Selector from '../common/Selector';
import { countryList } from '../../lib/staticData';
import Input from '../common/Input';
import { useSelector } from 'react-redux';
import { registerRoomActions } from './../../store/registerRoom';
import { useDispatch } from 'react-redux';
import RegisterRoomFooter from './RegisterRoomFooter';
import { getLocationInfoAPI } from './../../lib/api/map';

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
  .register-room-location-button-wrapper {
    width: 180px;
    margin-bottom: 24px;
  }
  .register-room-location-country-selector-wrapper {
    width: 385px; 
    margin-bottom: 24px;
  }
  .register-room-location-city-district {
    max-width: 385px; 
    display: flex;
    margin-bottom: 24px;
    > div:first-child {
      margin-right: 24px;
    }
  }
  .register-room-location-street-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-detail-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-postcode {
    max-width: 385px;
  }
`;


const RegisterRoomLocation = () => {
    const country = useSelector((state:any) => state.registerRoom.country);
    const city = useSelector((state:any) => state.registerRoom.city);
    const district = useSelector((state:any) => state.registerRoom.district);
    const streetAddress = useSelector(
      (state:any) => state.registerRoom.streetAddress
    );
    const detailAddress = useSelector(
      (state:any) => state.registerRoom.detailAddress
    );
    const postcode = useSelector((state:any) => state.registerRoom.postcode);

    const dispatch = useDispatch();

    //* 나라 변경시
    const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(registerRoomActions.setCountry(event.target.value));
    };

    //* 시/도 변경시
    const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setCity(event.target.value));
    };

    //* 시/군/구 변경시
    const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setDistrict(event.target.value));
    };

    //* 도로명주소 변경시
    const onChangeStreetAdress = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setStreetAddress(event.target.value));
    };
    //*동호수 변경시
    const onChangeDetailAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(registerRoomActions.setDetailAddress(event.target.value));
    };
    //*우편번호 변경시
    const onChangePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setPostcode(e.target.value));
    };

    // 현재 위치 불러오기에 성공했을 때
    const onSuccessGetLocation = async ({coords}:any)=>{
      try{
        const {data} = await getLocationInfoAPI({
          latitude:coords.latitude,
          longitude:coords.longitude,
        })
        console.log(data)
      }catch(e){
        console.log(e)
        alert(e)
      }
    }

    // 현재 위치 사용 버튼 클릭시 - 현재위치 불러옴
    const onClickGetCurrentLocation = ()=>{
      navigator.geolocation.getCurrentPosition(onSuccessGetLocation,(e)=>{
        console.log(e)
        alert(e?.message)
      })
    }
    
    return (
        <Container>
            <h2>숙소의 위치를 알려주세요.</h2>
            <h3>4단계</h3>
            <p className='register-room-step-info'>
                정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
            </p>
            <div className='register-room-location-button-wrapper'>
                <Button color='dark_cyan' colorReverse icon={<NavigationIcon/>} 
                onClick={onClickGetCurrentLocation}
                >
                    현재 위치 사용
                </Button>
            </div>
            <div className='register-room-location-country-selector-wrapper'>
                <Selector 
                    type='register'
                    options={countryList}
                    useValidation={false}
                    disabledOptions={["국가/지역 선택"]}
                    value={country}
                    onChange={onChangeCountry}
                />
            </div>
            <div className="register-room-location-city-district">
                <Input label="시/도" value={city} onChange={onChangeCity}
                useValidation={false} />
                <Input label="시/군/구" value={district} onChange={onChangeDistrict} useValidation={false}/>
            </div>
            <div className="register-room-location-street-address">
                <Input
                    label="도로명주소"
                    value={streetAddress}
                    onChange={onChangeStreetAdress}
                    useValidation={false}
                />
            </div>
            <div className="register-room-location-detail-address">
                <Input
                    label="동호수(선택 사항)"
                    value={detailAddress}
                    onChange={onChangeDetailAddress}
                    useValidation={false}
                />
            </div>
            <div className="register-room-location-postcode">
                <Input label="우편번호" value={postcode} onChange={onChangePostcode} 
                useValidation={false}/>
            </div>
            {/* 일단 푸터적용해서 다음단계 적용 */}
            <RegisterRoomFooter 
                prevHref='/room/register/bathroom'
                nextHref='/room/register/amentities'
                isValid={true} // 일단 true로 설정해둠 이동할수있도록
                />
        </Container>
    );
};

export default RegisterRoomLocation;