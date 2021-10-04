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

  select {
    margin-right: 24px;
  }
`;

export const Qnas = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const QnaItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 72px;
  border: 1px solid black;

  div {
    text-align: center;
  }

  a {
    color: gray;
  }

  .name {
    width: 120px;
  }
  .class {
    width: 240px;
  }
  .state {
    width: 120px;
  }
  .date {
    width: 120px;
  }
  .answer {
    color: gray;
    cursor: pointer;
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
