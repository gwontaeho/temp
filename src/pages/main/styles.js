import styled from "@emotion/styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.main`
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 50px 0;
`;

export const Item = styled.div`
  padding: 50px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      opacity: 0.9;
    }
  }

  .name {
    font-size: 1.2rem;
    padding: 10px 0;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    font-size: 1.1rem;
    font-weight: bold;
    color: #3f51b5;
  }

  .info {
    color: gray;
  }
`;
