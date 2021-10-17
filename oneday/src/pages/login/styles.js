import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border: 1px black solid;
    padding-left: 6px;
    margin-top: 6px;
    margin-bottom: 18px;
    height: 48px;
    cursor: pointer;
  }

  .button {
    border: 1px solid black;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 6px;
  }
`;

export const Section = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    color: gray;
    margin-left: 6px;
    margin-right: 6px;
  }
`;
