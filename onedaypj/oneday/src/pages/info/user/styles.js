import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 72px;
  border-bottom: 1px solid lightgray;
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 240px;
  border-bottom: 1px solid lightgray;
  display: flex;
`;

export const Image = styled.div`
  width: calc(240px - 48px);
  height: calc(100% - 48px);
  padding: 24px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .id {
    font-size: 3rem;
  }
  a {
    display: flex;
    align-items: center;
  }
`;
export const History = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 192px;
    font-size: 1.5rem;
  }
`;

export const Nav = styled.div`
  width: calc(240px - 24px);
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;

  & a {
    height: 96px;
    line-height: 96px;
    transition: 0.2s;
  }

  .location {
    color: #1976d2;
    font-weight: bold;
    transition: 0.2s;
  }
`;

export const RouteContainer = styled.div`
  flex: 1;
`;
