import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & label {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    div {
      height: 48px;
      display: flex;
      align-items: center;
      padding-left: 12px;
    }
  }
  & input {
    border: 1px solid gray;
    padding-left: 12px;
    height: 60px;
    cursor: pointer;
  }
  & select {
    height: 62px;
    padding-left: 6px;
    border: 1px solid gray;
    outline: none;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    height: 100%;
    width: 204px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
  }
`;
