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
  margin-bottom: 24px;

  select {
    margin-left: 24px;
  }
`;

export const Qnas = styled.div`
  width: 100%;
`;

export const QnaItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 72px;
  border: 1px solid black;

  div {
    text-align: center;
  }

  a {
    color: gray;
  }

  .name {
    width: 120px;
  }
  .class {
    width: 240px;
  }
  .state {
    width: 120px;
  }
  .date {
    width: 120px;
  }
`;
