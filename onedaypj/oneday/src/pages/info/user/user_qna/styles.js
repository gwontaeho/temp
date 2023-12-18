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

export const QnaHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const List = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;

  .name {
    display: flex;
    align-items: center;
    padding-left: 24px;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:hover {
    color: lightgray;
  }
`;
