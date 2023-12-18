import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  perspective: 2000px;
`;

export const Card = styled.div`
  position: relative;
  width: 1200px;
  height: 900px;
  border-radius: 30px;
  background-color: white;
  transition: transform 1s;
  transform-style: preserve-3d;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5);

  .front {
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px;

    > div {
      border: 1px solid lightgray;
      border-radius: 30px;
    }
  }

  .back {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    width: calc(100% - 100px);
    height: calc(100% - 100px);
    padding: 50px;
    position: absolute;
    backface-visibility: hidden;
  }
`;
