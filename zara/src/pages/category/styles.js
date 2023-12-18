import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100vw;
`;

export const Space = styled.div`
  width: 100%;
  height: 150px;
`;

export const Products = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  img {
    width: 100%;
    object-fit: contains;
    cursor: pointer;
  }
  a {
    color: black;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const Text = styled.div`
  width: 50%;
  .title {
    font-size: 1.2rem;
  }
`;

export const One = styled.div`
  width: calc(100% / 3);
`;

export const Two = styled.div`
  width: calc(100% / 3);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const Four = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
