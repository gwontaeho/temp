import styled from "@emotion/styled";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const List = styled.div`
  flex: 1;
  display: flex;
  width: 720px;
  flex-direction: column;
`;

export const Item = styled.div`
  div {
    height: 72px;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  pre {
    padding: 24px;
    font-size: 1.3rem;
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
