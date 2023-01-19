import React,{useMemo, useState} from 'react';
import styled from 'styled-components';
import CloseXIcon from "../../public/static/svg/modal_close_x_icon.svg"
import MailIcon from "../../public/static/svg/email.svg"
import PersonIcon from "../../public/static/svg/person.svg"
import OpenedEyeIcon from "../../public/static/svg/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/closed_eye.svg"
import palette from '../../styles/palette';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/staticData';
import Button from '../common/Button';
import { signupAPI } from '../../lib/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';
import { commonActions } from '../../store/common';
import useValidateMode from '../../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';
import { useEffect } from 'react';

const Container = styled.form`
    width:568px;
    padding:32px;
    background-color:white;
    z-index:11;

    .modal-close-x-icon{
        cursor: pointer;
        display:block;
        margin:0 0 40px auto;
    }

    .input-wrapper{
        position:relative;
        margin-bottom:16px;   
    }
    .sign-up-password-input-wrapper{
        svg{
            cursor: pointer;
        }
    }
    .sign-up-birthday-label{
        font-size:16px;
        font-weight:600;
        margin-top:16px;
        margin-bottom:8px;
    }   
    .sign-up-modal-birthday-info{
        margin-bottom:16px;
        color:${palette.charcoal}
    }
    .sign-up-modal-birthday-selectors{
        display:flex;
        margin-bottom:24px;
        .sign-up-modal-birthday-month-selector{
            margin-right:16px;
            flex-grow:1;
        }
        .sign-up-modal-birthday-day-selector{
            margin-right:16px;
            width:25%;
        }
        .sign-up-modal-birthday-year-selector{
            width:33.3333%
        }
    }
    .sign-up-modal-set-login-wrapper{
        margin-top:8px;
        border-top:1px solid ${palette.gray_eb};
        p{
            margin-top:8px;
        }
        .sign-up-modal-set-login{
        color:${palette.dark_cyan};
        margin-left:8px;
        cursor: pointer;
    }
    }
    
`

interface IProps {
    closeModal: () => void;
  }


const SignUpModal:React.FC<IProps> = ({closeModal}) => {
    // 비밀번호 숨김 토글할 state
    const [hidePassword,setHidePaddword] = useState(true)

    // 비밀번호 인풋이 포커싱 되었는지 확인하는 state
    const [passwordFocused,setPasswordFocused] = useState(false);

    // 비밀번호 최소 자릿수
    const PASSWORD_MIN_LENGTH = 8;

    // 새로운 유저 리덕스에 저장
    const dispatch = useDispatch();

    // input창 관리할 state
    const [inputs, setInputs] = useState({
        email: '',
        firstname: '',
        lastname:'',
        password:'',
      });
    
    // select 관리할 state
    const [selectInputs,setSelectInputs] = useState({
        birthMonth:"",
        birthDay:"",
        birthYear:""
    })

    // 비구조화 할당을 통해 값 추출
    const { email,firstname,lastname,password} = inputs; 
    const {birthMonth,birthDay,birthYear} = selectInputs;

    // input과 select onChange함수들
    const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      };

      const onChangeBirthSelector = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        const { value, name } = event.target; // 우선 e.target 에서 name 과 value 를 추출
        setSelectInputs({
          ...selectInputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      }
    // 비밀번호 인풋 포커스 되었을 때
    const onFocusPassword = ()=>{
        setPasswordFocused(true)
    }

      // 비밀번호 숨김 토글 함수
      const toggleHidePassword = ()=>{
        setHidePaddword(!hidePassword)
      }
      

    //* password가 이름이나 이메일을 포함하는지
    const isPasswordHasNameOrEmail = useMemo(
        () =>
        !password ||
        !lastname ||
        password.includes(lastname) ||
        password.includes(email.split("@")[0]),
        [password, lastname, email]
    );

    //* 비밀번호가 최수 자리수 이상인지
    const isPasswordOverMinLength = useMemo(
        () => password.length >= PASSWORD_MIN_LENGTH,
        [password]
    );

    //* 비밀번호가 숫자나 특수기호를 포함하는지
    const isPasswordHasNumberOrSymbol = useMemo(
        () =>
        !(
            /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
            /[0-9]/g.test(password)
        ),
        [password]
    );


      // 회원가입 폼 입력값 확인하기
      const vaidateSignUpForm = ()=>{
        // 인풋 값이 없다면
        if(!email||!lastname||!firstname||!password){
            return undefined;
        }
        //* 비밀번호가 올바르지 않다면
        if (
            isPasswordHasNameOrEmail ||
            !isPasswordOverMinLength ||
            isPasswordHasNumberOrSymbol
        ) {
            return false;
        }
        //* 생년월일 셀렉터 값이 없다면
        if (!birthDay || !birthMonth || !birthYear) {
            return false;
        }
        return true;
      }

      const {setValidateMode}=useValidateMode();

      useEffect(() => {
        return () => {
          setValidateMode(false);
        };
      }, []);


      // 회원가입 폼 제출하는 함수
      const onSubmitSignUp = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        setValidateMode(true)
        if(vaidateSignUpForm()){
            try{
                const signUpBody={
                    email,
                    lastname,
                    firstname,
                    password,
                    birthday: new Date(
                        `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
                      ).toUTCString(),
                }
                const {data} = await signupAPI(signUpBody);
                console.log(data)
                dispatch(userActions.setLoggedUser(data))
                closeModal()
            }catch(e){
                console.log(e)
            }
        }
      }


    return (
        <Container onSubmit={onSubmitSignUp}>
            <CloseXIcon className="modal-close-x-icon" onClick={closeModal}/>
            <div className='input-wrapper'>
                <Input placeholder='이메일 주소' type='email' 
                name="email"
                value={email}
                icon={<MailIcon/>}
                onChange={onChangeValue}
                useValidation
                isValid={!!email}
                errorMessage="이메일이 필요합니다"
                />
            </div>
            <div className='input-wrapper'>
                <Input placeholder='이름(예:길동)'
                name="lastname"
                value={lastname}
                icon={<PersonIcon/>}
                onChange={onChangeValue}
                useValidation
                isValid={!!lastname}
                errorMessage="이름을 입력하세요"
                />
            </div>
            <div className='input-wrapper'>
                <Input placeholder='성(예:홍)' 
                name="firstname"
                value={firstname}
                icon={<PersonIcon/>}
                onChange={onChangeValue}
                useValidation
                isValid={!!firstname}
                errorMessage="성을 입력하세요"
                />
            </div>
            <div className='input-wrapper sign-up-password-input-wrapper'>
                <Input placeholder='비밀번호 설정하기' type={hidePassword? "password" : "text" }
                value={password}
                name="password"
                icon={hidePassword? (
                    <ClosedEyeIcon onClick={toggleHidePassword}/>
                ):(
                    <OpenedEyeIcon onClick={toggleHidePassword}/>
                    )}
                onChange={onChangeValue}
                useValidation
                isValid={!isPasswordHasNameOrEmail&&
                    !isPasswordOverMinLength &&
                    !isPasswordHasNumberOrSymbol
                }
                errorMessage="비밀번호를 입력하세요"
                onFocus={onFocusPassword}
                />
            </div>
            {passwordFocused && (
                <>
                    <PasswordWarning 
                        isValid={isPasswordHasNameOrEmail}
                        text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."/>
                    <PasswordWarning 
                        isValid={!isPasswordOverMinLength}
                        text="최소 8자"/>
                    <PasswordWarning 
                        isValid={isPasswordHasNumberOrSymbol}
                        text="숫자나 기호를 포함하세요."/>
                </>
            )}

            <p className='sign-up-birthday-label'>생일</p>
            <p className='sign-up-modal-birthday-info'>만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 에어비앤비 이용자에게 공개되지 않습니다.</p>
            <div className='sign-up-modal-birthday-selectors'>
                <div className='sign-up-modal-birthday-month-selector'>
                    <Selector options={monthList}
                        name="birthMonth"
                        value={birthMonth}
                        isValid={!!birthMonth}
                        onChange={onChangeBirthSelector}
                    />
                </div>
                <div className='sign-up-modal-birthday-day-selector'>
                    <Selector options={dayList}
                        name="birthDay"
                        value={birthDay}
                        isValid={!!birthDay}
                        onChange={onChangeBirthSelector}
                    />
                </div>
                <div className='sign-up-modal-birthday-year-selector'>
                    <Selector options={yearList}
                        name="birthYear"
                        value={birthYear}
                        isValid={!!birthYear}
                        onChange={onChangeBirthSelector}
                    />
                </div>
            </div>
            <div className='sign-up-modal-submit-button-wrapper'>
                <Button type='submit'>가입하기</Button>
            </div>
            <div className='sign-up-modal-set-login-wrapper'>
            <p>
                이미 에어비앤비 계정이 있나요?
                <span
                className="sign-up-modal-set-login"
                role="presentation"
                onClick={()=>{}}
                >
                로그인
                </span>
            </p>
            </div>
        </Container>
    );
};

export default SignUpModal;