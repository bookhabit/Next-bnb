import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/auth/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/email.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [isPasswordHided,setIsPasswordHided] = useState(true);
    
    const dispatch = useDispatch();

    // 이메일 주소 onchange
    const onChangeEmail = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(event.target.value)
    }

    // 비밀번호 onchange
    const onChangePassword = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value)
    }

    // 회원가입 모달로 변경하기
    const chnageToSignUpModal = ()=>{
        dispatch(authActions.setAuthMode("signup"))
    }

  return (
    <Container>
      <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          icon={<MailIcon />}
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          name="password"
          type={isPasswordHided ? "password" : "text"}
          icon={isPasswordHided ? (<ClosedEyeIcon/>) : (<OpenedEyeIcon/>)}
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit" color="bittersweet">
          로그인
        </Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="login-modal-set-signup"
          role="presentation"
          onClick={chnageToSignUpModal}
        >
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
