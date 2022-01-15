import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-right: 50px;
  }

  .name {
    font-size: 1.4rem;
    font-weight: bold;
  }

  a {
    color: gray;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const Controls = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
    border-radius: 10px;
    object-fit: cover;
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
    font-weight: bold;
    font-size: 1.1rem;
    color: #1976d2;
  }
  .info {
    color: gray;
  }
`;
