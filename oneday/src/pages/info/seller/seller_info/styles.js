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
`;

export const Detail = styled.div`
  .detail {
    > div {
      display: flex;
      > div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        > input {
          height: 36px;
          padding-left: 12px;
          border: 1px solid lightgray;
        }

        .address {
          width: 480px;
        }
      }
    }
    .title {
      height: 60px;
      width: 192px;
    }
    padding-bottom: 24px;
    border-bottom: 1px solid lightgray;
  }

  .btns {
    margin-top: 24px;
    padding-left: 24px;
    display: flex;
    > div {
      margin-right: 24px;
      cursor: pointer;
    }
  }
`;
