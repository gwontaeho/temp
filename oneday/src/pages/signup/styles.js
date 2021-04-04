import styled from "@emotion/styled";

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

export const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Birth = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const BirthInput = styled.input`
  width: 96px;
`;

export const Select = styled.select`
  height: 50px;
  border: 1px solid black;
  outline: none;
  margin-top: 6px;
  margin-bottom: 18px;
`;

export const SignupBtn = styled.button`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid black;
  margin-top: 6px;
`;
