import styled from "@emotion/styled";

export const Container = styled.article`
  width: 100%;
  height: 100%;
  background-color: #ddd;
  padding: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  > * {
    transition: 0.5s;
    transform: translateY(-50px);
    opacity: 0;
  }
  &.open {
    > * {
      transform: translateY(0);
      opacity: 1;
    }
  }
  &.close {
    > * {
      transform: translateY(-50px);
      opacity: 0;
    }
  }
`;

export const Title = styled.div`
  font-size: 3rem;
  margin-bottom: 50px;
`;

export const Section = styled.section`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
`;

export const Project = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  align-items: center;
  cursor: pointer;
  perspective: 500px;
  :hover {
    > .open {
      transform: rotateX(-180deg);
    }
  }
  :active {
    transform: scale(0.9);
  }
  span {
    font-size: 1.2rem;
    margin-left: 10px;
  }
  .open {
    position: absolute;
    left: 0;
    transform-origin: 0 100%;
    transition: 0.5s;
    color: gray;
  }

  @media screen and (max-width: 1023px) {
    span {
      display: none;
    }
  }
`;
