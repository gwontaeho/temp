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

export const Nav = styled.div`
  width: 240px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid lightgray;

  & a {
    height: 120px;
    line-height: 120px;
  }
`;

export const RouteContainer = styled.div`
  flex: 1;
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 240px;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: center;
`;

export const Image = styled.div`
  width: calc(240px - 48px);
  height: calc(100% - 48px);
  padding: 24px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 60px;
  .id {
    font-size: 5rem;
  }
`;

export const History = styled.div`
  display: flex;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 240px;
    font-size: 2rem;
  }
`;
