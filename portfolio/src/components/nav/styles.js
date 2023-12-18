import styled from "@emotion/styled";

export const Container = styled.div`
  width: 50px;
  height: 100px;
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 9999;

  > div {
    width: 10px;
    height: 10px;
    border: 1px solid #bbb;
    cursor: pointer;

    &.current {
      background-color: #aaa;
    }
  }
`;
