import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const Slide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    > div {
      width: 100%;
      height: 100%;
      position: absolute;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
`;

export const Nav = styled.nav`
  z-index: 999;
  position: absolute;
  bottom: 10vh;
  right: 10vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 1em;
    height: 1rem;
    padding: 1rem;
    cursor: pointer;
  }

  .rotate {
    transform: rotate(180deg);
  }
`;
