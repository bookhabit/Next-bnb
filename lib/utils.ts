//* "token=value" 를 {token:"value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
    const cookies: { [key: string]: string } = {};
    if (cookieString) {
      //* "token=value"
      const itemString = cookieString?.split(/\s*;\s*/);
      itemString.forEach((pairs) => {
        //* ["token","value"]
        const pair = pairs.split(/\s*=\s*/);
        cookies[pair[0]] = pair.splice(1).join("=");
      });
    }
    return cookies;
  };

//*string에서 number만 return 하는 함수
export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join("");
  if (numbers) {
    return Number(numbers);
  }
  return null;
};



//* 금액을 입력하면 금액에 ,를 넣어주는 함수
export const makeMoneyString = (input: string) => {
  const amountString = input.replace(/[^0-9]/g, "");
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return "";
};

//* query string 만들기
export const makeQueryString = (
  baseUrl: string,
  queriesObject: Object & { [key: string]: any }
) => {
  const keys = Object.keys(queriesObject);
  const values = Object.values(queriesObject);
  if (keys.length === 0) {
    return baseUrl;
  }
  let queryString = `${baseUrl}?`;
  keys.forEach((key, i) => {
    if (queriesObject[key]) {
      queryString += `${keys[i]}=${values[i]}&`;
    }
  });
  //* 마지막 '&' 제거하기
  return queryString.slice(0, -1);
};


// splice함수로 년,월,일로 날짜 포맷바꾸기
export const changeDateFormat = (dateString:string)=>{
    const date = dateString.split('.')
    const year = date[0]+'년 '
    const month = date[1]+'월 '
    const day = date[2]+'일'

    const resultDate = month+day
    return resultDate
}