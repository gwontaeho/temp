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

  select {
    margin-left: 24px;
  }
`;

export const Qnas = styled.div`
  width: 100%;
`;

export const QnaItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:hover {
    color: lightgray;
  }
`;
