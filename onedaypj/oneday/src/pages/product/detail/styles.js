import styled from "@emotion/styled";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 24px;
`;

export const Header = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

export const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  div {
    width: calc(100% - 48px);
    height: 72px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
  }
  pre {
    padding-left: 24px;
    padding-right: 24px;
    white-space: pre-wrap;
  }
`;

export const Map = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 24px 0 24px;

  #map {
    width: 100%;
    border-radius: 24px;
    height: 480px;
  }

  .header {
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    border-: 1px solid lightgray;
  }
`;
