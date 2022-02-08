import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: black;
  font-family: "Roboto Mono", monospace;
  position: relative;
`;

export const SliderContainer = styled.div`
  overflow: hidden;
  user-select: none;
  cursor: grab;
  :active {
    cursor: grabbing;
  }
`;

export const Slider = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
`;

export const Item = styled.div`
  margin: 0 1rem;
  > div {
    overflow: hidden;
    border-radius: 1rem;
    > div {
      background-size: cover;
    }
  }
  > span {
    color: white;
    padding: 1rem;
    display: block;
  }
`;

export const Cover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
`;
