import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
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

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;
`;

export const InfoHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
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
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
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

export const UserNLocation = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid lightgray;
`;

export const User = styled.div`
  flex: 2;
  border-right: 1px solid lightgray;
  > div {
    height: 72px;
    display: flex;
    align-items: center;
    padding-left: 24px;
  }

  .title {
    width: 120px;
  }
`;

export const Location = styled.div`
  flex: 3;
  .address {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
  }
`;

export const Map = styled.div`
  width: calc(100%-48px);
  padding: 24px;

  #map {
    width: 100%;
    height: 360px;
    border-radius: 24px;
  }
`;
