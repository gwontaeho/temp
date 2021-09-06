import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: calc(100% - 48px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 24px;
  justify-content: space-between;

  .header-btns {
    display: flex;
    > div {
      margin-left: 24px;
      cursor: pointer;
    }
  }
`;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  textarea {
    width: 80%;
    margin-top: 24px;
    margin-bottom: 24px;
    resize: none;
    border: 1px solid lightgray;
    padding: 12px;
  }

  textarea:focus {
    outline: none;
  }
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
