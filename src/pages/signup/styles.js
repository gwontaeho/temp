import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  height: 300px;
  font-size: 5rem;
  display: flex;
  align-items: center;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  > *:not(:last-child) {
    margin-bottom: 30px;
  }
`;
