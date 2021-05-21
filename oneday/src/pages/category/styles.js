import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  background-color: white;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;
`;

export const Nav = styled.div`
  width: calc(100% -24px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;

  div {
    margin-right: 24px;
    cursor: pointer;
    :hover {
      color: gray;
    }
  }
`;

export const Classes = styled.div`
  width: calc(100% - 48px);
  display: grid;
  padding: 24px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  div {
    height: 32px;
    display: flex;
    align-items: center;
  }
`;
