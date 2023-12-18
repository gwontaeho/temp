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
    grid-template-rows: 192px;
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

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  border-bottom: 1px solid lightgray;

  > * {
    margin-left: 24px;
  }
`;
