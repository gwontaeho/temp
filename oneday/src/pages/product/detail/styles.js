import styled from "@emotion/styled";

export const Container = styled.div`
  width: calc(100% - 48px);
  padding: 24px;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 24px;
  }

  .title {
    height: 72px;
    line-height: 72px;
    border: 1px solid gray;
    font-size: 2rem;
  }

  #map {
    width: 50%;
    height: 480px;
  }
`;
