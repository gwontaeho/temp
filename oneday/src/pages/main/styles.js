import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.div`
  width: 100%;
`;

export const Ad = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 360px;
  background-color: lightgray;
  margin-bottom: 60px;
`;

export const Header = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Product = styled.div`
  > a {
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% -24px);
    display: flex;
    flex-direction: column;
    position: relative;
  }

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
    :hover {
      opacity: 0.8;
      transition: 0.2s;
    }
  }
`;

export const StyledSlider = styled(Slider)``;

export const Footer = styled.div`
  width: 100%;
  height: 240px;
  margin-top: 60px;
  background-color: lightgray;
`;
