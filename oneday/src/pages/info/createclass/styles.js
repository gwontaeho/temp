import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 600px;
  background-color: lightgrey;

  & form {
    display: flex;
    flex-direction: column;
    & button {
      width: 500px;
      height: 100px;
    }
    & img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  }
`;
