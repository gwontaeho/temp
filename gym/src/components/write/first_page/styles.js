import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Header = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  padding-left: 50px;
`;

export const ExercisesList = styled.div`
  width: 100%;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 50px;
`;

export const ExercisesItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .exercise-name {
    font-size: 3rem;
    font-weight: bold;
    color: gray;

    :hover {
      color: #00b400;
      cursor: pointer;
    }
  }

  .remove-button {
    color: lightgray;
    font-weight: bold;
    cursor: pointer;
    :hover {
      color: #b40000;
    }
  }
`;

export const AddExercise = styled.div`
  padding-left: 50px;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  > input {
    width: 300px;
    height: 50px;
    text-align: center;
    margin-left: 30px;
    font-size: 1.5rem;
    font-weight: bold;
    border: 0;
    border-bottom: 1px solid lightgray;
    outline: none;

    :hover,
    :focus {
      border-color: #b4b4b4;
    }
  }

  .add-button {
    cursor: pointer;
    :hover {
      color: #b4b4b4;
    }
  }
`;

export const PageControls = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;

    :hover {
      color: #b4b4b4;
    }
  }
`;
