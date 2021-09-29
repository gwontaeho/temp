import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    .title {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .idCheck {
        cursor: pointer;
        color: gray;
      }
    }

    .contents {
      position: relative;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        height: 60px;
        border: 1px solid gray;
        padding-left: 12px;
        cursor: pointer;
      }
      div {
        display: none;
        right: 0;
        position: absolute;
        width: 72px;
        text-align: center;
      }
    }
  }

  select {
    height: 62px;
    padding-left: 6px;
    border: 1px solid black;
    outline: none;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    height: 100%;
    width: 204px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  }
`;
