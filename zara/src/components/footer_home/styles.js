import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const Marketing = styled.div`
  width: 70%;
  margin-top: 200px;

  .title {
    font-size: 1.2rem;
  }

  input {
    border: 0;
    height: 50px;
    width: 300px;
    border-bottom: 1px solid lightgray;
    outline: none;
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

export const Legal = styled.div`
  margin-top: 20vh;
  border-top: 1px solid lightgray;
  width: 70%;
  padding-bottom: 100px;
`;
