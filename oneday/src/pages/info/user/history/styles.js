import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: 100%;
  height: 144px;
  border: 1px solid lightgray;
  display: flex;

  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const List = styled.div`
  width: 100%;
  border-top: 1px solid lightgray;
`;

export const Item = styled.div`
  width: 100%;
  height: 144px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 144px;
    height: 96px;
    object-fit: cover;
  }

  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
