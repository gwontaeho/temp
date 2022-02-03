import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100vw;
  font-family: "Roboto Mono", monospace;
  &.demo0 {
    background-color: #1d1b22;
  }
  &.demo1 {
    background-color: #56cccf;
  }
`;

export const Morph = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  > .demo1 {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 12px;
    stroke: #22bcc0;
  }
`;

export const Article = styled.article`
  width: 100%;
`;

export const Section = styled.section`
  width: 100%;
  height: 100vh;
`;

export const Nav = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2rem;
  > span {
    display: inline-block;
    color: white;
    font-size: 1.2rem;
    padding: 1rem;
    margin: 1rem;
    cursor: pointer;
  }
`;
