import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 360px;
  & input {
    border: 1px black solid;
    padding-left: 6px;
    margin-top: 6px;
    margin-bottom: 18px;
    height: 48px;
    cursor: pointer;
  }
`;

export const Logo = styled.div`
  width: 100%;
  height: 120px;
  background-color: lightcyan;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LoginBtn = styled.button`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid black;
  margin-top: 6px;
`;

export const Find = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FindLink = styled(Link)`
  color: gray;
  margin-left: 6px;
  margin-right: 6px;
`;
