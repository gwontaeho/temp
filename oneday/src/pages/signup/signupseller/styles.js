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
  & button {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 6px;
  }
`;
