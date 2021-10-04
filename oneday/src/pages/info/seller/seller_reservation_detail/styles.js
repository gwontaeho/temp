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
  display: flex;

  .title {
    width: 120px;
  }

  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 120px;

    > div {
      cursor: pointer;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    > div {
      height: 36px;
      display: flex;
      align-items: center;
    }
`;
