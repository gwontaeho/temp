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
`;

export const Buttons = styled.div`
  height: 72px;
  width: calc(100% - 24px);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  padding-left: 24px;

  a {
    margin-right: 24px;
    cursor: pointer;
  }
`;

export const Infos = styled.div`
  width: 100%;
`;

export const Img = styled.div`
  display: flex;
  width: calc(100% - 24px);
  align-items: center;
  border: 1px solid lightgray;
  padding-left: 24px;
  margin-bottom: 24px;
  border-style: dotted;

  img {
    width: 360px;
    height: 240px;
    margin: 24px 0 24px 0;
    object-fit: cover;
  }

  .title {
    display: flex;
    align-items: center;
    width: 240px;
    height: 72px;
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
  margin-bottom: 24px;
  border: 1px solid lightgray;
  border-style: dotted;
  .title {
    width: 240px;
  }
  input {
    width: 240px;
    height: 48px;
    border: 0;
    border-bottom: 1px solid gray;
  }
`;

export const Address = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 24px);
  border: 1px solid lightgray;
  padding-left: 24px;
  margin-bottom: 24px;
  border-style: dotted;

  .title {
    width: 240px;
  }

  .box {
    display: flex;
    flex-direction: column;
  }

  .oldAddress {
    display: flex;
    align-items: center;
    height: 72px;
  }

  .addressButtons {
    height: 72px;
    display: flex;
    align-items: center;
    .addressButton {
      cursor: pointer;
      margin-right: 24px;
      color: gray;
    }
    .selected {
      color: black;
    }
  }
  .inputs {
    display: none;
    flex-direction: column;
  }
  input {
    width: 360px;
    height: 48px;
    border: 0;
    border-bottom: 1px solid gray;
    margin-bottom: 24px;
  }
  .open {
    display: flex;
  }
`;

export const Details = styled.div`
  width: calc(100% - 48px);
  padding: 0 24px 0 24px;
  border: 1px solid lightgray;
  border-style: dotted;
  .title {
    display: flex;
    align-items: center;
    height: 72px;
  }
  .add {
    display: flex;
    align-items: center;
    height: 72px;
    margin-left: 24px;
  }
  .details {
    display: flex;
    flex-direction: column;
    width: 100%;

    .detail {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-bottom: 24px;

      .header {
        height: 72px;
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        input {
          width: 240px;
          height: 48px;
          border: 0;
          border-bottom: 1px solid gray;
        }

        .removeButton {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 36px;
          width: 48px;
          background-color: white;
        }
      }
      textarea {
        height: 240px;
        resize: none;
        border: 1px solid lightgray;
      }
    }
  }
`;
