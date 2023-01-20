import React from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import useModal from '../hooks/useModal';
import ModalPortal from './ModalPortal';
import AuthModal from './auth/AuthModal';

const HeaderAuths = () => {
    const {openModal,ModalPortal,closeModal} = useModal();
    const dispatch = useDispatch();
    return (
        <>
            <div className="header-auth-buttons">
                <button type="button" className="header-sign-up-button"
                onClick={ ()=>{
                    dispatch(authActions.setAuthMode("signup"));
                    openModal();
                } }
                >
                    회원가입
                </button>
                <button type="button" className="header-login-button"
                onClick={ ()=>{
                    dispatch(authActions.setAuthMode("login"));
                    openModal();
                } }
                >
                    로그인
                </button>
            </div>
            <ModalPortal>
                <AuthModal closeModal={closeModal}/>
            </ModalPortal>
        </>
    );
};

export default HeaderAuths;