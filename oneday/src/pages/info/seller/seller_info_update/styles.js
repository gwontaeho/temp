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
  margin-bottom: 24px;
`;

export const Info = styled.div`
  padding-left: 24px;
  div {
    display: flex;
    align-items: center;
  }
  .title {
    height: 60px;
    width: 192px;
  }
  margin-bottom: 24px;

  input {
    height: 36px;
    padding-left: 12px;
    border: 1px solid lightgray;
    margin-right: 12px;
  }
`;

export const Button = styled.div`
  border-top: 1px solid lightgray;
  padding-left: 24px;
  display: flex;
  align-items: center;
  height: 72px;
  div {
    cursor: pointer;
    padding: 12px;
    margin-right: 12px;
  }
`;
