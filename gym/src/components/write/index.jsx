import { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScreen } from "../../redux/screen/actions";
import { Container, Header, Slider } from "./styles";
import FirstPage from "./first_page";
import SecondPage from "./second_page";

const Write = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);

  const sliderRef = useRef();

  const [exercise, setExercise] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState([]);

  const movePage = useCallback((page) => {
    sliderRef.current.style.left = `-${page * 1200}px`;
  }, []);

  const addRecord = useCallback(() => {
    if (!time) return window.alert("운동한 시간을 입력해주세요");

    const newRecord = {
      key: new Date().getTime(),
      exercise,
      time,
      details,
    };

    let record = JSON.parse(
      window.localStorage.getItem(date.current.toLocaleDateString())
    );
    if (record) record.push(newRecord);
    else record = [newRecord];
    window.localStorage.setItem(
      date.current.toLocaleDateString(),
      JSON.stringify(record)
    );

    movePage(0);
    setExercise("");
    setTime("");
    setDetails([]);
    dispatch(setScreen(0));
  }, [exercise, time, details]);

  return (
    <Container>
      <Header>{`${date.current.getFullYear()}년 ${
        date.current.getMonth() + 1
      }월 ${date.current.getDate()}일`}</Header>
      <Slider>
        <div ref={sliderRef} className="slider">
          <FirstPage movePage={movePage} setExercise={setExercise} />
          <SecondPage
            movePage={movePage}
            exercise={exercise}
            time={time}
            setTime={setTime}
            details={details}
            setDetails={setDetails}
            addRecord={addRecord}
          />
        </div>
      </Slider>
    </Container>
  );
};

export default Write;
