import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

export const Controls = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  :hover {
    color: #3f51b5;
  }
`;

export const List = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 100px;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const Item = styled.div`
  img {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
    cursor: pointer;
    :hover {
      opacity: 0.9;
    }
  }
  .name {
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px 0;
  }
  .price {
    font-size: 1.1rem;
    font-weight: bold;
    color: #3f51b5;
  }
  .info {
    color: gray;
  }
  .unanswered {
    color: #3f51b5;
    font-weight: bold;
  }
`;
