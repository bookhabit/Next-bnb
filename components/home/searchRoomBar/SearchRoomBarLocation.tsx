import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import DatePicker from "../../common/DatePicker";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  &:hover {
    border-color: ${palette.gray_dd};
  }
`;

const SearchRoomBarLocation: React.FC = () => {  
  return (
    <Container>
      위치
    </Container>
  );
};

export default SearchRoomBarLocation;
