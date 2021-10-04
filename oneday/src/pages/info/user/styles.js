import styled from "@emotion/styled";

export const Container = styled.div`
  width: calc(100% - 24px);
  padding-left: 24px;
  display: flex;
  .routes {
    padding: 24px;
    flex: 1;
  }
`;

export const Nav = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;

  & a {
    height: 72px;
    line-height: 72px;
  }
`;
