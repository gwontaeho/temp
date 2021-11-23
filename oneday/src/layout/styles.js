import styled from "@emotion/styled";

export const Container = styled.div`
  width: 1440px;
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

  a {
    height: 100%;
  }

  img {
    width: 240px;
    height: 100%;
    object-fit: cover;
  }
`;

export const Nav = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
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
  font-size: 1.1rem;

  a {
    padding: 12px;
  }
  a:hover {
    color: gray;
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 240px;
  margin-top: 24px;
  background-color: lightgray;
  border-radius: 24px;
`;
