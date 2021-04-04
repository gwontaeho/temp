import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 1200px;
  height: 1200px;
  background-color: ivory;
`;

export const Header = styled.div`
  width: calc(100% - 48px);
  height: 60px;
  background-color: lightpink;
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Logo = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Sign = styled.form`
  width: 360px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & a {
    color: black;
    margin-left: 12px;
  }
`;

export const Search = styled.div`
  width: 100%;
  height: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  & form {
    display: flex;
    align-items: center;
    height: 60px;
  }
  & input {
    width: 480px;
    height: 100%;
  }
  & button {
    width: 78px;
    height: 100%;
    border: 0;
  }
`;

export const Nav = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  & a {
    margin-left: 24px;
    margin-rifht: 24px;
  }
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
