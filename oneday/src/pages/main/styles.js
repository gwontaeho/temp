import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .progress {
    margin-top: 120px;
  }
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 24px;
`;

export const Ad = styled.div`
  position: relative;
  top: 0;

  width: 100%;
  height: 240px;
  border: 1px solid black;
`;

export const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
  }

  .class {
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% -24px);
    display: flex;
    flex-direction: column;
    position: relative;

    .address {
      position: absolute;
      bottom: 72px;
      color: white;
    }

    div {
      width: 100%;
      padding-left: 12px;
      height: 36px;
      display: flex;
      align-items: center;
    }

    img {
      width: 100%;
      height: 240px;
      object-fit: cover;
      border-radius: 12px;
      transition: 0.2s;
    }
    img:hover {
      opacity: 0.8;
      transition: 0.2s;
    }
  }
`;
