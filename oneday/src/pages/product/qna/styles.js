import styled from "@emotion/styled";

export const Container = styled.div`
  width: calc(100% - 48px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 720px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const QnaList = styled.div`
  width: 720px;
`;

export const QnaItem = styled.div`
  width: 100%;
  margin-bottom: 24px;
  .id {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .question {
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 12px;
  }
  .answer {
    padding: 24px;
    margin-left: 48px;
    background-color: lightgray;
    border-radius: 12px;
  }
`;

export const ModalHeader = styled.div`
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

export const QnaTextarea = styled.div`
  display: flex;
  justify-content: center;
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
