import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;

  .calendar {
    width: 100%;
  }
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
  width: calc(100% - 24px);
  padding-right: 24px;
  height: 72px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid lightgray;
  div {
    margin-left: 24px;
    cursor: pointer;
    :hover {
      color: lightgray;
    }
  }
`;

export const InfoHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Info = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  height: 120px;
  border-bottom: 1px solid lightgray;

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 24px;
  }

  img {
    width: 120px;
    height: 96px;
    object-fit: cover;
    padding-right: 24px;
  }

  .classDate {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      :hover {
        color: lightgray;
      }
    }
  }
`;

export const List = styled.div`
  width: 100%;
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 72px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 72px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:hover {
    color: lightgray;
  }
`;
