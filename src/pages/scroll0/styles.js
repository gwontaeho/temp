import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  font-family: "Roboto Mono", monospace;
  background-color: #b7b19f;
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  gap: 50px;
  padding: 0 100px;
  box-sizing: border-box;
`;

export const Column = styled.div`
  display: flex;
  overflow: hidden;
  &.column {
    flex-direction: column;
  }
  &.column-reverse {
    flex-direction: column-reverse;
  }
  > div {
    padding: 100px 0;
  }
`;

export const Item = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width: 100%;
    background-size: cover;
    border-radius: 10px;
    :after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }
`;

export const Scroll = styled.div`
  width: 10px;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;

  > div {
    width: 100%;
    height: 10%;
    background-color: #ccc;
    border-radius: 5px;
  }
`;
