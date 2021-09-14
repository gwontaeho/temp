import styled from "@emotion/styled";

export const Container = styled.div`
  width: 1280px;
  font-size: 1.3rem;
`;

export const Logo = styled.div`
  width: 100%;
  height: 144px;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  a {
    width: 360px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Sign = styled.form`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & a {
    color: black;
    margin-left: 12px;
  }
`;

export const Nav = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;

  div {
    padding-left: 24px;
  }
  a {
    margin-right: 24px;
  }
  a:hover {
    color: gray;
  }
`;
