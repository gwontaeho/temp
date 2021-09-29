import styled from "@emotion/styled";

export const Container = styled.div`
  width: calc(100% - 48px);
  padding: 24px;
`;

export const DetailInfo = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid black;

  flex-direction: column;
  margin-bottom: 24px;

  .title {
    height: 72px;
    line-height: 72px;
    border: 1px solid gray;
    font-size: 2rem;
  }
`;

export const Map = styled.div`
  display: flex;

  #map {
    width: 50%;
    height: 360px;
  }
`;
