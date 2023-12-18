import styled from "@emotion/styled";

export const Container = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 24px;
    input {
      height: 36px;
    }
  }

  .overlap {
    display: flex;
    justify-content: flex-end;
  }

  > button {
    width: 100%;
    height: 48px;
    :not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .gender {
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      width: 168px;
      height: 48px;
    }
  }
`;

export const Img = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  label {
    width: 240px;
    height: 240px;
    border-radius: 50%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  input {
    display: none;
  }
`;
