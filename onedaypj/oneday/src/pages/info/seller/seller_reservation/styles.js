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
`;

export const Nav = styled.div`
  width: 100%;
  height: 144px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-bottom: 1px solid lightgray;
  align-items: center;
  justify-items: center;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 96px;
    height: 96px;
    cursor: pointer;
    border: 2px solid lightgray;
    border-radius: 50%;
  }
  .current {
    border-color: #1976d2;
    transition: 0.5s;
  }
`;

export const Condition = styled.div`
  width: calc(100% - 48px);
  height: 72px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  > div {
    display: flex;
    align-items: center;
    > * {
      margin-right: 24px;
    }
  }
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const List = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid lightgray;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;

  .info {
    display: flex;
    align-items: center;
    padding-left: 24px;
  }

  img {
    width: 120px;
    height: 96px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 24px;
  }

  .text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    a {
      :hover {
        color: lightgray;
      }
    }
  }
`;
