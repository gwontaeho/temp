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

export const Detail = styled.div`
  display: flex;

  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  padding-top: 12px;
  padding-bottom: 12px;
  margin-bottom: 24px;

  > div {
    display: flex;
    flex-direction: column;
    > div {
      height: 36px;
      display: flex;
      align-items: center;
    }
  }

  .title {
    width: 120px;
  }

  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 120px;

    & > div {
      cursor: pointer;
    }
  }
`;
