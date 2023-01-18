import React,{useState} from 'react';
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
    
`

const SignUpModal:React.FC = () => {
    // 비밀번호 숨김 토글할 state
    const [hidePassword,setHidePaddword] = useState(true)

    // input창 관리할 state
    const [inputs, setInputs] = useState({
        email: '',
        firstname: '',
        lastname:'',
        password:'',
      });

      const { email,firstname,lastname,password} = inputs; // 비구조화 할당을 통해 값 추출

      const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      };

      // select 관리할 state
      const [selectInputs,setSelectInputs] = useState({
        birthMonth:"",
        birthDay:"",
        birthYear:""
      })

      const {birthMonth,birthDay,birthYear} = selectInputs;

      // 새로운 유저 리덕스에 저장
      const dispatch = useDispatch();

      const onChangeBirthSelector = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        const { value, name } = event.target; // 우선 e.target 에서 name 과 value 를 추출
        setSelectInputs({
          ...selectInputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      }
// console.log(birthMonth,birthDay,birthYear)

      // 비밀번호 숨김 토글 함수
      const toggleHidePassword = ()=>{
        setHidePaddword(!hidePassword)
      }

      const {setValidateMode}=useValidateMode();

      // 회원가입 폼 제출하는 함수
      const onSubmitSignUp = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        setValidateMode(true)

        if(!email||!lastname||!firstname||!password){
            return undefined;
        }

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
            
        }catch(e){
            console.log(e)
        }
      }


    return (
        <Container onSubmit={onSubmitSignUp}>
            <CloseXIcon className="modal-close-x-icon"/>
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
            <div className='input-wrapper'>
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
                isValid={!!password}
                errorMessage="비밀번호를 입력하세요"
                />
            </div>

            <p className='sign-up-birthday-label'>생일</p>
            <p className='sign-up-modal-birthday-info'>만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 에어비앤비 이용자에게 공개되지 않습니다.</p>
            <div className='sign-up-modal-birthday-selectors'>
                <div className='sign-up-modal-birthday-month-selector'>
                    <Selector options={monthList}
                        name="birthMonth"
                        value={birthMonth}
                        onChange={onChangeBirthSelector}
                    />
                </div>
                <div className='sign-up-modal-birthday-day-selector'>
                    <Selector options={dayList}
                        name="birthDay"
                        value={birthDay}
                        onChange={onChangeBirthSelector}
                    />
                </div>
                <div className='sign-up-modal-birthday-year-selector'>
                    <Selector options={yearList}
                        name="birthYear"
                        value={birthYear}
                        onChange={onChangeBirthSelector}
                    />
                </div>
            </div>
            <div className='sign-up-modal-submit-button-wrapper'>
                <Button type='submit'>가입하기</Button>
            </div>
        </Container>
    );
};

export default SignUpModal;