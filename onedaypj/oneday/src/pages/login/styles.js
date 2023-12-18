import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 360px;
    height: 48px;
    margin-bottom: 24px;
  }
`;

export const Title = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

export const Inner = styled.div`
  display: flex;
  height: 600px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;

  button {
    margin: 0 12px 0 12px;
    height: 48px;
    width: 120px;
  }
`;

export const Inputs = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 24px;
  }

  input {
    height: 36px;
  }
`;
