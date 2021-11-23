import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: calc(100% - 48px);
  padding-right: 24px;
  padding-left: 24px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const List = styled.div`
  width: calc(100% - 48px);
  padding: 0 24px 0 24px;
`;

export const Item = styled.div`
  width: 100%;
  margin-bottom: 24px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 24px;
  }

  .text {
    flex: 1;
    margin-left: 24px;
    white-space: pre-wrap;
  }

  .question {
    min-height: 60px;
    display: flex;
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 12px;
  }
  .answer {
    width: calc(100% - 48px - 48px);
    height: 60px;
    display: flex;
    padding: 24px;
    margin-left: 48px;
    background-color: lightgray;
    border-radius: 12px;
  }
`;

export const ModalBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 720,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};

export const ModalHeader = styled.div`
  padding: 0 24px 0 24px;
  width: calc(100% - 48px);
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .buttons {
    display: flex;
    > div:not(:last-child) {
      margin-right: 24px;
    }
  }
`;

export const QuestionText = styled.div`
  width: 100%;
`;
