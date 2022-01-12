import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../../redux/screen/actions";
import {
  Container,
  Header,
  ExercisesList,
  ExercisesItem,
  AddExercise,
  PageControls,
} from "./styles";

const FirstPage = ({ movePage, setExercise }) => {
  const dispatch = useDispatch();
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = useCallback(() => {
    const exercises = JSON.parse(window.localStorage.getItem("exercises"));
    if (exercises) setExercises(exercises);
  }, []);

  const addExercise = useCallback(() => {
    const find = exercises.find((element) => element === exerciseName);
    if (find) return window.alert("이미 목록에 있는 운동입니다.");
    const newExercises =
      exercises.length === 0 ? [exerciseName] : [...exercises, exerciseName];
    window.localStorage.setItem("exercises", JSON.stringify(newExercises));
    setExerciseName("");
    getExercises();
  }, [exercises, exerciseName]);

  const removeExercise = useCallback(
    (exercise) => {
      const newExercises = [...exercises];
      const index = newExercises.findIndex((element) => element === exercise);
      newExercises.splice(index, 1);
      window.localStorage.setItem("exercises", JSON.stringify(newExercises));
      getExercises();
    },
    [exercises]
  );

  const exercisesList = exercises.map((exercise) => {
    return (
      <ExercisesItem key={exercise}>
        <div
          className="exercise-name"
          onClick={() => {
            setExercise(exercise);
            movePage(1);
          }}
        >
          {exercise}
        </div>
        <div className="remove-button" onClick={() => removeExercise(exercise)}>
          삭제
        </div>
      </ExercisesItem>
    );
  });

  return (
    <Container>
      <Header>어떤 운동을 했나요?</Header>
      <ExercisesList>{exercisesList}</ExercisesList>
      <AddExercise>
        <div>목록에 새로운 운동 추가</div>
        <input
          type="text"
          placeholder="운동 이름을 입력해주세요"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <div className="add-button" onClick={addExercise}>
          추가
        </div>
      </AddExercise>
      <PageControls>
        <div
          onClick={() => {
            setExerciseName("");
            dispatch(setScreen(0));
          }}
        >
          돌아가기
        </div>
      </PageControls>
    </Container>
  );
};

export default FirstPage;
