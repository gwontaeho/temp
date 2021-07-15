import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;
`;

export const Info = styled.div`
  width: calc(100% - 48px);
  padding: 24px;
  display: flex;
  border-bottom: 1px solid lightgray;
  img {
    width: 240px;
    height: 180px;
    object-fit: cover;
  }
  & > div {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 24px;
  }
  & > div > div {
    flex: 1;
  }
`;

export const UserInfo = styled.div`
  width: calc(100% - 48px);
  padding: 24px;
  border-bottom: 1px solid lightgray;

  label {
    height: 72px;
    display: flex;
    align-items: center;
    div {
      width: 120px;
    }
  }

  input {
    width: 180px;
    height: 42px;
    border: 1px solid lightgray;
    padding-left: 12px;
    cursor: pointer;
  }
`;

export const Apply = styled.div`
  width: calc(100% - 48px);
  height: 72px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  div {
    width: 180px;
    height: 60px;
    border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
