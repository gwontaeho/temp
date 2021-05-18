import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 60px;
  width: 480px;
`;

export const Logo = styled.div`
  width: 100%;
  height: 120px;
  background-color: lightcyan;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const TypeContainer = styled.div`
  width: 100%;
  height: 240px;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  & a {
    border: 1px solid black;
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
