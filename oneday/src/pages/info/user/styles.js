import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
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
