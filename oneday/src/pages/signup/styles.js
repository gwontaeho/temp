import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IndexContainer = styled.div``;

export const TypeContainer = styled.div`
  margin-top: 120px;
  width: 720px;
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
