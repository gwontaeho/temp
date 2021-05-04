import styled from "@emotion/styled";

export const Container = styled.div`
  width: 1200px;
`;

export const Header = styled.div`
  width: calc(100% - 48px);
  height: 72px;
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid lightgray;
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
  height: 72px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;

  & div {
    padding-left: 24px;
  }
  & a {
    margin-right: 24px;
  }

  & form {
    height: 100%;
    padding-right: 24px;
    display: flex;
    align-items: center;
  }
  & input {
    width: 240px;
    height: 48px;
    border: 0;
    border-bottom: 1px solid lightgray;
  }
  & button {
    width: 60px;
    height: 48px;
  }
`;
