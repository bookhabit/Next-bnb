import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import AirbnbLogoIcon from "../public/static/svg/logo.svg"
import AirbnbLogoTextIcon from "../public/static/svg/logo_text.svg"
import palette from "../styles/palette";
import { useSelector } from 'react-redux';
import HeaderAuths from "./HeaderAuths";
import HeaderUserProfile from "./HeaderUserProfile";

const Container = styled.div`
    /* 헤더창 */
    position:sticky;
    top:0;
    width:100%;
    height:80px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 80px;
    background-color:white;
    box-shadow:rgba(0,0,0,0.08) 0px 1px 12px;
    z-index:10;
    /* 헤더 좌측 로고 */
    .header-logo-wrapper{
        display:flex;
        align-items:center;
        .header-logo{
            margin-right:6px;
        }
    }
    /* 헤더 우측 로그인,회원가입 */
    .header-auth-buttons{
        .header-sign-up-button{
            height:42px;
            margin-right:8px;
            padding:0 16px;
            border:0;
            border-radius:21px;
            background-color:white;
            cursor: pointer;
            outline:none;
            &:hover{
                background-color:${palette.gray_f7}
            }
        }
        .header-login-button{
            height:42px;
            padding:0 16px;
            border:0;
            box-shadow:0px 1px 2px rgba(0,0,0,0.18);
            border-radius:21px;
            background-color:white;
            cursor: pointer;
            outline:none;
            &:hover{
                box-shadow:0px 2px 8px rgba(0,0,0,0.12)
            }
        }
    }
    /* 모달창 스타일링 */
    .modal-wrapper{
            width:100%;
            height:100%;
            display:flex;
            justify-content:center;
            align-items:center;
            position:fixed;
            top:0;
            left:0;
            .modal-background{
                position:absolute;
                width:100%;
                height:100%;
                background-color:rgba(0,0,0,0.75);
                z-index:10;
            }
            .modal-contents{
                width:400px;
                height:400px;
                background-color:white;
                z-index:11;
            }
        }
        /* 로그인한 경우 헤더 유저 프로필 스타일링 */
        .header-user-profile{
            display:flex;
            align-items:center;
            height:42px;
            padding:0 6px 0 16px;
            border:0;
            box-shadow:0px 1px 2px rgba(0,0,0,0.18);
            border-radius:21px;
            background-color:white;
            cursor: pointer;
            outline:none;
            &:hover{
                box-shadow:0px 2px 8px rgba(0,0,0,0.12);
            }
        }
        .header-user-profile-image{
            margin-left:8px;
            width:30px;
            height:30px;
            border-radius:50%;
        }

        /** react-ouside-click-handler div */
        .header-logo-wrapper + div {
            position: relative;
        }

        .header-usermenu {
            position: absolute;
            right: 0;
            top: 52px;
            width: 240px;
            padding: 8px 0;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
            border-radius: 8px;
            background-color: white;
            li {
            display: flex;
            align-items: center;
            width: 100%;
            height: 42px;
            padding: 0 16px;
            cursor: pointer;
            &:hover {
                background-color: ${palette.gray_f7};
            }
            }
            .header-usermenu-divider {
            width: 100%;
            height: 1px;
            margin: 8px 0;
            background-color: ${palette.gray_dd};
            }
        }
                

`

const Header:React.FC = ()=>{
    const user =useSelector((state:any)=>state.user);
    
    return (
        <Container>
            <Link href="/">
                <div className="header-logo-wrapper">
                    <AirbnbLogoIcon className="header-logo"/>
                    <AirbnbLogoTextIcon/>
                </div>
            </Link>
            {!user.isLogged&& <HeaderAuths/>}
            {user.isLogged&& <HeaderUserProfile/>}
        </Container>
    )
}

export default Header;