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

  select {
    margin-right: 24px;
  }
`;

export const Qnas = styled.div`
  width: 100%;
`;

export const QnaItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;

  div {
    display: flex;
    align-items: center;
    :not(.product_info) {
      justify-content: center;
    }
  }

  .product_info {
    padding-left: 24px;
  }

  .answer {
    cursor: pointer;
    :hover {
      color: lightgray;
    }
  }
`;

export const Text = styled.div`
  padding: 24px;
  width: calc(100% - 48px);
  border-bottom: 1px solid lightgray;
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
