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
  margin-bottom: 24px;
  border-radius: 24px;
  margin-top: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  margin-bottom: 24px;
  .title {
    font-size: 3rem;
  }
  .ex {
    font-size: 2rem;
  }
`;

export const Product = styled.div`
  > a {
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% -24px);
    display: flex;
    flex-direction: column;
  }

  .img {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
    transition: 0.2s;
    :hover {
      opacity: 0.8;
      transition: 0.2s;
    }
  }
  .rating {
    position: absolute;
    padding-left: 12px;
    bottom: 0;
    width: calc(100% - 12px);
    height: 36px;
    display: flex;
    align-items: center;
  }
  .info {
    width: calc(100% - 24px);
    padding: 0 12px 0 12px;
    > div {
      width: 100%;
      min-height: 36px;
      display: flex;
      align-items: center;
    }
  }
  .address {
    > div {
      line-height: 36px;
      margin-left: 6px;
    }
  }
`;

export const StyledSlider = styled(Slider)`
  margin-bottom: 24px;
`;
