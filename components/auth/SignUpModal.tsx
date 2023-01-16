import React,{useState} from 'react';
import styled from 'styled-components';
import CloseXIcon from "../../public/static/svg/modal_close_x_icon.svg"
import MailIcon from "../../public/static/svg/mail.svg"
import PersonIcon from "../../public/static/svg/person.svg"
import OpenedEyeIcon from "../../public/static/svg/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/closed_eye.svg"
import palette from '../../styles/palette';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/staticData';
import Button from '../common/Button';

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
        mail: '',
        first_name: '',
        last_name:'',
        password:'',
      });

      const { mail,first_name,last_name,password} = inputs; // 비구조화 할당을 통해 값 추출

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

    return (
        <Container>
            <CloseXIcon className="modal-close-x-icon"/>
            <div className='input-wrapper'>
                <Input placeholder='이메일 주소' type='mail' 
                name="mail"
                value={mail}
                icon={<MailIcon/>}
                onChange={onChangeValue}
                />
            </div>
            <div className='input-wrapper'>
                <Input placeholder='이름(예:길동)'
                name="last_name"
                value={last_name}
                icon={<PersonIcon/>}
                onChange={onChangeValue}
                />
            </div>
            <div className='input-wrapper'>
                <Input placeholder='성(예:홍)' 
                name="first_name"
                value={first_name}
                icon={<PersonIcon/>}
                onChange={onChangeValue}
                />
            </div>
            <div className='input-wrapper'>
                <Input placeholder='비밀번호 설정하기' type={hidePassword? "password" : "text" }
                value={password}
                name="password"
                icon={hidePassword? (
                    <ClosedEyeIcon onClick={toggleHidePassword}/>
                ):(
                    <OpenedEyeIcon oClick={toggleHidePassword}/>
                    )}
                onChange={onChangeValue}
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