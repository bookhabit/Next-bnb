import React,{useState} from 'react';
import styled,{css} from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from '../../store';

interface SelectorContainerProps {
    isValid: boolean;
    validateMode: boolean;
  }
  const Container = styled.div<SelectorContainerProps>`
    width:100%;
    height:46px;

    select{
        width:100%;
        height:100%;
        border:1px solid ${palette.gray_eb};
        padding:0 11px;
        border-radius:4px;
        outline:none;
        -webkit-appearance:none;
        background-image: url("/static/svg/common/selector/select_down_arrow.svg");
        background-position: right 11px center;
        background-repeat: no-repeat;
        font-size:16px;

        &:focus{
            border-color:${palette.dark_cyan}
        }
    }

    /* 셀렉터 밸리데이션 */
    ${({isValid,validateMode})=>
        validateMode &&css`
        select{
        border-color:${isValid?palette.dark_cyan:palette.tawny} !important;
        background-color:${isValid?"white":palette.tawny};
    }
`} 
`

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    options?:string[];
    disabledOptions?:string[];
    value?:string;
    isValid:Boolean;
}

const Selector:React.FC<IProps> = ({options=[],
    disabledOptions=[],isValid,
    ...props}) => {
        const validateMode = useSelector((state)=>state.common.validateMode)
    return (
        <Container isValid={!!isValid} validateMode={validateMode}>
            <select {...props}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                    </option>
                ))}
            </select>
        </Container>
    );
};

export default React.memo(Selector);