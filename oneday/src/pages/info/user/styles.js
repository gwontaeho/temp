import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  .routes {
    flex: 1;
  }
`;

export const Nav = styled.div`
  width: calc(240px - 24px);
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;

  & a {
    height: 72px;
    line-height: 72px;
  }
`;
