import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: "Roboto Mono", monospace;
`;

export const Screens = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

export const Screen = styled.div`
  width: 100%;
  height: 100%;
  background-color: #282b27;
  position: absolute;
  top: 0;
  opacity: 0;

  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
`;

export const Full = styled.div`
  opacity: 0.6;
`;

export const Clip = styled.div`
  clip-path: polygon(37% 15%, 63% 15%, 63% 85%, 37% 85%);
`;

export const Nav = styled.nav`
  z-index: 100;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10vw;
    > span {
      color: white;
      font-size: 3rem;
      cursor: pointer;
      :hover {
        color: #f0b579;
      }
    }
  }
`;
