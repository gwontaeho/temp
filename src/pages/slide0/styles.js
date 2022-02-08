import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const Slides = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  overflow: hidden;
  will-change: transform;

  > div {
    position: absolute;
    top: -200px;
    left: -200px;
    width: calc(100% + 400px);
    height: calc(100% + 400px);
    background-size: cover;
    background-position: center;
    will-change: transform;
  }
`;

export const Frame = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  pointer-events: none;
`;

export const Nav = styled.nav`
  position: absolute;
  width: 300px;
  margin-left: -150px;
  left: 50%;
  bottom: 0;
  text-align: center;
  padding: 2em;
`;
