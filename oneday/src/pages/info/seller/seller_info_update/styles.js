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

export const Info = styled.div`
  display: grid;
  grid-template-columns: 144px 1fr 144px 1fr;
  border-bottom: 1px solid lightgray;
  .header {
    border-right: 1px solid lightgray;
  }
  .left {
    display: grid;
    grid-template-rows: 192px 96px 96px 96px;
    > div {
      display: flex;
      align-items: center;
      padding-left: 24px;
    }
  }
  .right {
    display: grid;
    grid-template-rows: repeat(5, 96px);
    > div {
      display: flex;
      align-items: center;
      padding-left: 24px;
    }
  }
  img {
    width: 144px;
    height: 144px;
    object-fit: cover;
    border-radius: 50%;
  }
  label {
    display: flex;
    align-items: flex-end;
    height: 144px;
    input {
      display: none;
    }
  }
  .button_img_back {
    display: flex;
    align-items: flex-end;
    height: 144px;
  }
`;

export const Introduce = styled.div`
  display: flex;
  min-height: 96px;
  border-bottom: 1px solid lightgray;

  .title {
    width: calc(144px - 25px);
    min-height: 96px;
    display: flex;
    align-items: center;
    padding-left: 24px;
    border-right: 1px solid lightgray;
  }
  .input {
    width: 360px;
    min-height: 96px;
    display: flex;
    align-items: center;
    padding-left: 24px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  border-bottom: 1px solid lightgray;

  button {
    margin-left: 24px;
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
