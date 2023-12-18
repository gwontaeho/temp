import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: white;
  display: flex;
  justify-content: center;
  transform: translateX(100%);
  transition: transform 0.5s;
  overflow-y: scroll;
  &.open {
    transform: translateX(0);
  }
  &.dark {
    background-color: black;
    svg,
    g,
    path {
      stroke: #fff;
    }
  }
`;

export const Inner = styled.div`
  width: 412px;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: bold;
`;

export const Button = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  path {
    stroke: #000;
  }
`;

export const Nav = styled.div`
  flex: 1;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: flex;
    align-items: center;
    margin: 30px 0;
    > div {
      margin-left: 16px;
      font-size: 2.2rem;
      font-weight: bold;
    }
  }
  img {
    width: 48px;
    height: 48px;
  }
`;

export const Footer = styled.div`
  width: 100%;
  padding-top: 18px;
  padding-bottom: 36px;
  display: flex;
  justify-content: space-between;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    display: inline;
    margin-right: 24px;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: #000;
  }
  .mode {
    cursor: pointer;
  }
`;
