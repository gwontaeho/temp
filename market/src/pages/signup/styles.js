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

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  > div {
    margin-bottom: 25px;
  }
`;
