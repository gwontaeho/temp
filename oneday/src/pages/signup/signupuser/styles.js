import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  & form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  & label {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  & input {
    border: 1px black solid;
    padding-left: 6px;
    margin-top: 6px;
    margin-bottom: 18px;
    height: 48px;
    cursor: pointer;
  }
  & select {
    height: 50px;
    border: 1px solid black;
    outline: none;
    margin-top: 6px;
    margin-bottom: 18px;
  }

  & button {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid black;
    margin-top: 6px;
  }
`;

export const Birth = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & input {
    width: 120px;
  }
`;
