import styled from "@emotion/styled";

export const Container = styled.div`
  width: calc(100vw - 60px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  padding: 30px;
  z-index: 100;
`;

export const Button = styled.div`
  width: 18px;
  height: 14px;
  cursor: pointer;
`;

export const Logo = styled.div`
  width: 200px;
  margin-left: 200px;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    width: 150px;
    margin-left: 150px;
  }
`;
