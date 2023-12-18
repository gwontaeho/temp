import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Slider = styled.div`
  width: 100%;
  height: 100%;
  transform: translateY(-100%);
  transition: 1s;
  > * {
    overflow: hidden;
  }
`;
