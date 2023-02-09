import axios from "axios";
import description from './../../pages/room/register/description';

type GetLocationInfoAPIResponse = {
    latitude:number,
    longitude:number,
    country:string,
    city:string,
    district:string,
    streetAddress:string,
    postcode:string
}

// 현재 위치 정보 가져오기 api
export const getLocationInfoAPI = async ({latitude,longitude}:{latitude:number; longitude:number;})=> axios.get<GetLocationInfoAPIResponse>(`/api/maps/location?latitude=${latitude}&longitude=${longitude}`)

// 구글 장소 검색 api
export const searchPlacesAPI  = (keyword:string)=>{
    return axios.get<{description:string;placeId:string}[]>(`/api/maps/places?keyword=${keyword}`)
}

// placeId로 장소 정보 가져오기
export const getPlaceAPI  = (placeId:string)=>{
    return axios.get<{location:string;latitude:number;longitude:number}>(`/api/maps/places/${placeId}`)
}