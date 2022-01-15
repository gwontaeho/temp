import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  font-size: 1.5rem;
`;

export const List = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 100px;
  grid-template-columns: repeat(3, 1fr);
`;

export const Item = styled.div`
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
    width: 100%;
    padding: 10px 0;
    font-size: 1.2rem;
    font-weight: bold;
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
