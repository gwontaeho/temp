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
  width: calc(100% - 48px);
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(3, 1fr);
  padding: 24px;
`;

export const Item = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 12px;
  a {
    width: calc(100% - 48px);
    padding: 0 24px 0 24px;
    height: 120px;
    display: flex;
    align-items: center;
  }
  img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 24px;
  }
`;
