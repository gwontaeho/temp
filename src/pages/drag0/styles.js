import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: black;
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
  > div {
    overflow: hidden;
    > div {
      background-size: cover;
    }
  }
  > span {
    color: white;
    padding: 10px;
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
