import styled from "@emotion/styled";

export const Container = styled.nav`
  z-index: 9999;
  width: 300px;
  height: 100vh;
  background-color: #aaa;
  position: sticky;
  top: 0;
  font-family: "Roboto Mono", monospace;
  display: flex;
  flex-direction: column;

  > a {
    text-decoration: none;
    color: white;
    margin: 1rem 1rem 1rem 2rem;
  }
`;

export const Effects = styled.div``;

export const Effect = styled.div``;

export const Name = styled.div`
  margin: 1rem;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  > a {
    color: white;
    text-decoration: none;
  }
`;
