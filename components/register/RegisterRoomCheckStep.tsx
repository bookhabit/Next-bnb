import React from "react";
import styled from "styled-components";
import Link from "next/link";
import CheckMarkIcon from "../../public/static/svg/register/dark_cyan_check_mark.svg";
import Button from "../common/Button";
import palette from "../../styles/palette";

const Container = styled.li`
  display: inline-block;
  padding: 16px 0;
  a {
    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;
    }

    span {
      font-size: 16px;
      font-weight: 600;
      text-decoration: underline;
    }
  }
  .register-room-check-step-in-progress {
    margin-left: 28px;
  }
  .register-room-check-step-continue-button {
    margin: 8px 0 0 28px;
    button{
      font-size:14px;
    }
  }
  .disabled-step {
    margin-left: 28px;
    font-size: 16px;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  disabled: boolean;
  inProgress: boolean;
  step: string;
  href: string;
}

const RegisterRoomCheckStep: React.FC<IProps> = ({
  disabled,
  inProgress,
  step,
  href,
}) => {
  if (inProgress) {
    return (
      <Container>
        <Link href={href}>
          <div className="register-room-check-step-in-progress">
            <span>{step}</span>
          </div>
        </Link>
        <Link href={href}>
          <div className="register-room-check-step-continue-button">
            <Button color="dark_cyan" width="60px" size="small">
              계속
            </Button>
          </div>
        </Link>
      </Container>
    );
  }
  if (disabled) {
    return (
      <Container>
        <p className="disabled-step">{step}</p>
      </Container>
    );
  }
  return (
    <Container>
      <Link href={href}>
        <div>
          <CheckMarkIcon />
          <span>{step}</span>
        </div>
      </Link>
    </Container>
  );
};

export default RegisterRoomCheckStep;
