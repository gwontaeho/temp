import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Slider = styled.div`
  width: 100%;
  height: 200%;
  transition: 0.8s;
`;

export const Top = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
  overflow: hidden;
`;

export const Bottom = styled.div`
  width: 100%;
  height: 50%;
  overflow: hidden;
`;

export const TopSlider = styled.div`
  width: fit-content;
  display: flex;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.8s;

  > div {
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      max-height: 600px;
      object-fit: contain;
    }
  }
`;

export const PrevButton = styled.div`
  display: flex;
  align-items: center;
  .icon {
    width: 20px;
    transform: rotate(180deg);
  }
  position: absolute;
  top: 50%;
  left: 50px;
  cursor: pointer;
`;

export const NextButton = styled.div`
  display: flex;
  align-items: center;
  .icon {
    width: 20px;
  }
  position: absolute;
  top: 50%;
  right: 50px;
  cursor: pointer;
`;

export const Buttons = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  > div {
    width: 8px;
  }
`;
