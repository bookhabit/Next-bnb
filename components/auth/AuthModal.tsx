import React from 'react';
import { useSelector,RootState } from '../../store';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

interface IProps{
    closeModal:()=> void;
}

const AuthModal:React.FC<IProps> = ({closeModal}) => {
    // 회원가입 모달 or 로그인 모달 띄울지
    const authMode = useSelector((state:RootState)=>state.auth.authMode)
    return (
        <>
            {authMode==="signup"&&<SignUpModal closeModal={closeModal}/>}
            {authMode==="login"&&<LoginModal closeModal={closeModal}/>}
        </>
    );
};

export default AuthModal;