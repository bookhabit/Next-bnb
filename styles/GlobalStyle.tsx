import reset from "styled-reset";
import palette from "./palette";
import { createGlobalStyle,css } from "styled-components";

const globalStyle = css`
    ${reset};
    *{
        box-sizing: border-box;
    }
    body{
        font-family: Noto Sans,Noto Sans KR;
        color:${palette.black}
    }
    a{
        text-decoration: none;
        color:${palette.black};
    }
    li{
        list-style: none;
    }
`

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`

export default GlobalStyle;