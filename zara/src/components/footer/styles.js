import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Marketing = styled.div`
  width: 70%;
  margin-top: 200px;

  input {
    border: 0;
    border-bottom: 1px solid lightgray;
  }

  .social {
    margin-top: 100px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      display: inline;
      margin-right: 50px;
    }
  }
`;

export const Sitemap = styled.div`
  width: 70%;
  display: flex;
  padding: 200px 0 100px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-right: 50px;
  }
  .title {
    font-size: 1.1rem;
  }
`;

export const Nav = styled.div`
  width: 70%;
  padding: 100px 0 100px;
  border-top: 1px solid lightgray;
`;

export const Legal = styled.div`
  width: 70%;
  padding-bottom: 100px;
`;
