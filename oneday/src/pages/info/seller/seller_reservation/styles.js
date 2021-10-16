import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Nav = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  border-bottom: 1px solid lightgray;
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 24px;
`;

export const List = styled.div`
  width: 100%;
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
