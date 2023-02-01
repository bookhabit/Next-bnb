//* users.json에 저장된 유저 타입 - 서버
export type StoredUserType = {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    birthday: string;
    profileImage: string;
  };
  
  // password값 지운 유저타입 - 클라이언트
  export type UserType = {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
    profileImage: string;
  };
  