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
  & a {
    margin-right: 24px;
  }
`;

export const Section = styled.div`
  padding-left: 24px;
  display: flex;
  & .route {
    padding: 24px;
    flex: 1;
  }
`;

export const InfoContainer = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;

  & div {
    height: 72px;
    display: flex;
    align-items: center;
  }
`;
