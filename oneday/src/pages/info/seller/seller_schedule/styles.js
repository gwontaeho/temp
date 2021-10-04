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
  margin-bottom: 24px;
`;

export const Item = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding-left: 24px;

  .name {
    width: 144px;
  }

  > div {
    margin-right: 24px;
  }
`;
