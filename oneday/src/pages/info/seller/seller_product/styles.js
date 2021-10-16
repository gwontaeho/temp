import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;

  a:hover {
    color: lightgray;
  }
`;

export const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const Product = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
`;

export const Image = styled.div`
  width: calc(240px - 48px);
  height: calc(240px - 48px);
  padding: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
