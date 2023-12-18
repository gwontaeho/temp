import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.5s, background-color 0.5s;

  &.open {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.9);
  }

  &.close {
    pointer-events: none;
  }
`;

export const Button = styled.div`
  width: 30px;
  height: 30px;
  margin: 30px;
  margin-bottom: 100px;
  cursor: pointer;
`;

export const Nav = styled.div`
  .nav {
    width: fit-content;
    margin-left: 30px;
    cursor: pointer;
  }

  .others {
    color: lightgray;

    :hover {
      color: black;
    }
  }

  .category {
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    padding: 30px;
    background-color: rgba(255, 232, 0, 0.8);

    > div {
      width: fit-content;
      cursor: pointer;
    }
  }
`;
