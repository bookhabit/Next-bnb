//* 침대 유형
export type BedType =
  | "다른 침대 추가"
  | "소파"
  | "에어 매트릭스"
  | "요와 이불"
  | "싱글"
  | "더블"
  | "퀸"
  | "이층 침대"
  | "바닥용 에어매트릭스"
  | "유아 침대"
  | "유아용 침대"
  | "해먹"
  | "물침대";

  //* 저장 된 숙소 타입
export type StoredRoomType = {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public";
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  hostId: number;
};

// 데이터 타입지정
type RegisterRoomState= {
  largeBuildingType:string|null; // 집종류
  buildingType:string|null; // 건물 유형
  roomType:string|null; // 숙소 유형
  isSetUpForGuest:boolean|null; // 게스트용인지
  maximumGuestCount:number; // 최대 숙박인원
  bedroomCount: number; // 침실 개수
  bedCount: number; // 침대 개수
  bedList: { id: number; beds: { type: BedType; count: number }[] }[]; // 침대유형
  publicBedList: { type: BedType; count: number }[]; // 공용공간 침대유형
  bathroomCount:number;
  bathroomType:"private"|"public"|null;
  country:string;
  city:string;
  district:string;
  streetAddress:string;
  detailAddress:string;
  postcode:string;
  latitude:number;
  longitude:number;
  amentities:string[]; // 편의시설
  conveniences:string[]; // 편의공간
  photos:string[] // 숙소이미지
  description:string; // 숙소설명
  title:string; // 숙소 제목
  price:number; // 숙소 가격
  startDate:string|null; // 예약시작날짜
  endDate:string|null; // 예약 마지막날짜
}

//* 숙소 타입
export type RoomType = {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public";
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  host: UserType;
};
