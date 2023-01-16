import React,{useState} from 'react';
import styled from 'styled-components';
import CloseXIcon from "../../public/static/svg/modal_close_x_icon.svg"
import MailIcon from "../../public/static/svg/mail.svg"
import PersonIcon from "../../public/static/svg/person.svg"
import OpenedEyeIcon from "../../public/static/svg/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/closed_eye.svg"
import palette from '../../styles/palette';
import Input from '../common/Input';

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
    
`

const SignUpModal:React.FC = () => {
    const [inputs, setInputs] = useState({
        mail: '',
        first_name: '',
        last_name:'',
        password:''
      });

      const { mail,first_name,last_name,password } = inputs; // 비구조화 할당을 통해 값 추출

      const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      };

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
                <Input placeholder='비밀번호 설정하기' type='password' 
                value={password}
                name="password"
                icon={<OpenedEyeIcon/>}
                onChange={onChangeValue}
                />
            </div>
        </Container>
    );
};

export default SignUpModal;