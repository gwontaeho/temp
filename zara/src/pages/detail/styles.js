import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100vw;
  @media screen and (max-width: 768px) {
    height: 100vh;
    overflow: hidden;
  }
`;

export const Main = styled.div`
  padding: 100px 0;
  width: 100vw;
  height: calc(100vh - 200px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
    padding-top: 100px;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
  }
`;

export const Image = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  :hover .thumbnails {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    padding: 0 50px;
    width: calc(100% - 100px);
    height: calc(100% - 200px);
  }
`;

export const Slider = styled.div`
  width: calc(100% - 100px);
  height: calc(100vh - 200px);
  overflow: scroll;
  overscroll-behavior: contain;
  ::-webkit-scrollbar {
    display: none;
  }

  div {
    width: 100%;
    height: fit-contents;
    display: flex;
    flex-direction: column;
    transition: 0.5s;
  }

  img {
    width: 100%;
    height: calc(100vh - 200px);
    object-fit: contain;
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 50px);
    height: 100%;
    img {
      object-fit: cover;
    }
  }
`;
export const Progress = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .bar {
    height: 100%;
    width: 2px;
    background-color: lightgray;
  }

  .progress {
    position: absolute;
    transition: 0.5s;
    width: 2px;
    background-color: black;
  }
`;
export const Thumbnails = styled.div`
  width: 50px;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  opacity: 0;

  ul {
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  img {
    width: 100%;
    object-fit: contains;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Side = styled.div`
  width: 50%;
  align-self: end;

  > * {
    margin: 10px 0;
  }

  .name {
    font-size: 1.5rem;
  }

  .colors {
    display: flex;
    align-items: center;
  }

  .color {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > div {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  }

  .sizes {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  .size {
    cursor: pointer;
    padding: 5px;
    :hover {
      background-color: lightgray;
    }
  }

  .size-guide {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  .mark {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
    width: 1rem;
    height: 1rem;
  }

  .cart {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    padding: 5px 0;
    cursor: pointer;
  }

  .actions {
    > div {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SideMin = styled.div`
  padding: 10px 30px;
  width: calc(100% - 60px);
  height: 180px;
  display: none;
  flex-direction: column;
  justify-content: space-evenly;

  .info {
    display: flex;
    justify-content: space-between;
  }

  .name {
    font-size: 1.2rem;
  }

  .colors {
    display: flex;
    align-items: center;
  }

  .color {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > div {
      width: 18px;
      height: 18px;
      border-radius: 50%;
    }
  }

  .cart {
    background-color: black;
    color: white;
    height: 40px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

export const Secondary = styled.div`
  width: calc(100vw - 100px);
  padding: 50px;
  .title {
    font-size: 1.5rem;
    padding-bottom: 20px;
  }
  .products {
    width: fit-content;
    display: flex;
  }

  .product {
    width: calc(100vw / 5);
    img {
      width: 100%;
      object-fit: contains;
    }
    :not(:last-child) {
      margin-right: 20px;
    }
    .cart {
      width: 100%;
      max-width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2rem;
      margin-top: 10px;
      border: 1px solid black;
      cursor: pointer;
    }
  }
`;
