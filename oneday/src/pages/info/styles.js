import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 600px;
  background-color: lightgrey;
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  padding-left: 24px;
`;

export const InfoContainer = styled.div`
  width: calc(100% - 24px);
  background-color: lightgreen;
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  & div {
    display: flex;
    height: 120px;
    align-items: center;
  }
  & a {
    margin-right: 24px;
  }
`;
