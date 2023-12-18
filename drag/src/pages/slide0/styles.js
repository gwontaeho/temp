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
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  bottom: 5vh;
  text-align: center;

  .button {
    cursor: pointer;
    padding: 1rem;
    font-weight: bold;
    font-size: 1.1rem;
    :hover {
      color: #f0b579;
    }
  }
`;
