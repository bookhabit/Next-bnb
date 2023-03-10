import React, { useState } from 'react';
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

    //* ?????? ?????? ???????????? ??????
  const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    //* ?????? ?????????
    const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(registerRoomActions.setCountry(event.target.value));
    };

    //* ???/??? ?????????
    const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setCity(event.target.value));
    };

    //* ???/???/??? ?????????
    const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setDistrict(event.target.value));
    };

    //* ??????????????? ?????????
    const onChangeStreetAdress = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setStreetAddress(event.target.value));
    };
    //*????????? ?????????
    const onChangeDetailAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(registerRoomActions.setDetailAddress(event.target.value));
    };
    //*???????????? ?????????
    const onChangePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setPostcode(e.target.value));
    };

    // ?????? ?????? ??????????????? ???????????? ???
    const onSuccessGetLocation = async ({coords}:any)=>{
      try{
        const {data:currentLocation} = await getLocationInfoAPI({
          latitude:coords.latitude,
          longitude:coords.longitude,
        })
        // ????????? ?????? ?????? ????????? ????????? ???????????? ????????????
        dispatch(registerRoomActions.setCountry(currentLocation.country==="South Korea"?"????????????":currentLocation.country));
        dispatch(registerRoomActions.setCity(currentLocation.city));
        dispatch(registerRoomActions.setDistrict(currentLocation.district));
        dispatch(
          registerRoomActions.setStreetAddress(currentLocation.streetAddress)
        );
        dispatch(registerRoomActions.setPostcode(currentLocation.postcode));
        dispatch(registerRoomActions.setLatitude(currentLocation.latitude));
        dispatch(registerRoomActions.setLongitude(currentLocation.longitude));
        setLoading(false);
      }catch(e){
        console.log(e)
        alert(e)
      }
    }

    // ?????? ?????? ?????? ?????? ????????? - ???????????? ?????????
    const onClickGetCurrentLocation = ()=>{
      setLoading(true)
      // ?????? ????????? ????????? ????????? ????????? ??????????????? ?????????
      navigator.geolocation.getCurrentPosition(onSuccessGetLocation,(e)=>{
        console.log(e)
        alert(e?.message)
      })
    }
    
    return (
        <Container>
            <h2>????????? ????????? ???????????????.</h2>
            <h3>4??????</h3>
            <p className='register-room-step-info'>
                ????????? ?????? ????????? ???????????? ????????? ????????? ????????? ???????????????.
            </p>
            <div className='register-room-location-button-wrapper'>
                <Button color='dark_cyan' colorReverse icon={<NavigationIcon/>} 
                onClick={onClickGetCurrentLocation}
                >
                    {loading?"???????????? ???":"?????? ?????? ??????"}
                </Button>
            </div>
            <div className='register-room-location-country-selector-wrapper'>
                <Selector 
                    type='register'
                    options={countryList}
                    useValidation={false}
                    disabledOptions={["??????/?????? ??????"]}
                    value={country}
                    onChange={onChangeCountry}
                />
            </div>
            <div className="register-room-location-city-district">
                <Input label="???/???" value={city} onChange={onChangeCity}
                useValidation={false} />
                <Input label="???/???/???" value={district} onChange={onChangeDistrict} useValidation={false}/>
            </div>
            <div className="register-room-location-street-address">
                <Input
                    label="???????????????"
                    value={streetAddress}
                    onChange={onChangeStreetAdress}
                    useValidation={false}
                />
            </div>
            <div className="register-room-location-detail-address">
                <Input
                    label="?????????(?????? ??????)"
                    value={detailAddress}
                    onChange={onChangeDetailAddress}
                    useValidation={false}
                />
            </div>
            <div className="register-room-location-postcode">
                <Input label="????????????" value={postcode} onChange={onChangePostcode} 
                useValidation={false}/>
            </div>
            
            <RegisterRoomFooter 
                prevHref='/room/register/bathroom'
                nextHref='/room/register/geometry'
                isValid={true} // ?????? true??? ???????????? ?????????????????????
                />
        </Container>
    );
};

export default RegisterRoomLocation;