import React from 'react';
import { useSelector } from 'react-redux';
import styled,{css} from 'styled-components';
import palette from '../../styles/palette';

type InputContainerProps = {
    iconExist:boolean;
    isValid:boolean;
    useValidation:boolean;
}

const Container = styled.div<InputContainerProps>`
    display:flex;
    align-items:center;
    input{
            position:relative;
            width:100%;
            height:46px;
            padding:${({iconExist})=> (iconExist?"0 44px 0 11px":"0 11px")};
            border:1px solid ${palette.gray_eb};
            border-radius:4px;
            font-size:16px;
            outline:none;
            ::placeholder{
                color:${palette.gray_76}
            }
            &:focus{
                border-color:${palette.dark_cyan} !important;
            }
        }
    svg{
        position:absolute;
        right:11px;
        height:46px;
    }
        
    .input-icon-wrapper{
        position:absolute;
        top:0;
        right:11px;
        height:75px;
        display:flex;
        align-items:center;
    }
    /* 인풋 밸리데이션 */
    ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        &:focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.dark_cyan};
      }
    `}
`

const ErrorContainer = styled.div`
  margin-top:8px;
    p{
      color:${palette.tawny};
      font-weight:600;
      font-size:14px;
    }
        
`

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?:JSX.Element;
    isValid?:boolean;
    useValidation?:boolean;
    errorMessage?:string;
}

const Input:React.FC<IProps> = ({icon,isValid=false,useValidation=true,errorMessage,...props})=>{
    
    const validateMode = useSelector((state:any) => state.common.validateMode);

    return (
      <>
        <Container 
            iconExist={!!icon} 
            isValid={isValid} 
            useValidation={validateMode&&useValidation}>
            <input {...props}/>
            <div className='input-icon-wrapper'>{icon}</div>
        </Container>
        <ErrorContainer>
          {useValidation&&validateMode&&!isValid&&errorMessage&&
          (<p>{errorMessage}</p>)}
        </ErrorContainer>
        </>
    );
};

export default Input;