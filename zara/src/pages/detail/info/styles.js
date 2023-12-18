import styled from "@emotion/styled";

export const Container = styled.div`
  width: 50%;
  height: 50%;
  overflow: hidden;
  align-self: end;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const Content = styled.div`
  width: calc(100% - 20px);
  height: calc(100% - 50px);
  padding-right: 20px;
  overflow-y: scroll;
  overscroll-behavior: contain;
  scroll-behavior: smooth;

  * {
    margin: 20px 0;
  }

  .title {
    font-size: 1.1rem;
  }

  img {
    width: 100%;
    object-fit: contains;
  }

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: black;
  }

  ::-webkit-scrollbar-track {
    background-color: lightgray;
  }
`;

export const Button = styled.div`
  width: fit-content;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
