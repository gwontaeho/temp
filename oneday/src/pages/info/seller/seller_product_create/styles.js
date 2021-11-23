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
`;

export const Buttons = styled.div`
  height: 72px;
  width: calc(100% - 24px);
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;
  button {
    margin-right: 24px;
  }
`;

export const Infos = styled.div`
  width: 100%;
  .title {
    width: 240px;
  }
  border-bottom: 1px solid lightgray;
`;

export const Img = styled.div`
  display: flex;
  width: calc(100% - 24px);
  height: 240px;
  align-items: center;
  padding-left: 24px;

  img {
    width: 196px;
    height: 196px;
    border-radius: 24px;
    object-fit: cover;
  }

  input {
    display: none;
  }
`;

export const Info = styled.div`
  display: flex;
  height: 72px;
  width: calc(100% - 24px);
  align-items: center;
  padding-left: 24px;
`;

export const Address = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 24px);
  padding-left: 24px;

  .type {
    display: flex;
    align-items: center;
    height: 72px;
    > * {
      margin-right: 24px;
    }
  }
`;

export const Details = styled.div`
  width: 100%;

  .title {
    padding-left: 24px;
    width: calc(100% - 24px);
    display: flex;
    align-items: center;
    height: 72px;
    line-height: 72px;
    > * {
      margin-right: 24px;
    }
  }

  .details {
    width: calc(100% - 24px);
    padding-left: 24px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightgray;

    .detail {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;

      .header {
        height: 96px;
        display: flex;
        align-items: center;
        input {
          padding-left: 12px;
          padding-right: 12px;
          width: 600px;
          height: 36px;
          border: 1px solid lightgray;
        }
        .removeButton {
          border: 1px solid lightgray;
          margin-left: 24px;
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
          color: gray;
          :hover {
            color: lightgray;
          }
        }
      }
      textarea {
        padding: 12px;
        height: 240px;
        width: 600px;
        resize: none;
        border: 1px solid lightgray;
      }
    }
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
