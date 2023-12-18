import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  font-size: 5rem;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

export const Inputs = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  > div {
    margin-bottom: 25px;
  }
`;
