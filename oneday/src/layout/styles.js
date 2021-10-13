import styled from "@emotion/styled";

export const Container = styled.div`
  width: 1440px;
  font-size: 1.3rem;
`;

export const Header = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  border-bottom: 1px solid lightgray;
`;

export const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Nav = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding: 12px;
  }
  a:hover {
    color: gray;
  }
`;

export const Sign = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding: 12px;
  }
  a:hover {
    color: gray;
  }
`;
