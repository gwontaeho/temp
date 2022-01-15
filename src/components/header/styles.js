import styled from "@emotion/styled";

export const Container = styled.header`
  width: 100%;
  height: 100px;
  z-index: 1;
  background-color: white;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
`;

export const Logo = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    font-size: 2rem;
    color: #1976d2;
    font-weight: bold;
    text-decoration: none;
  }
`;

export const Search = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Controls = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
