import { Container, Info, Nav } from "./styles";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import Calendar from "../../components/calendar";
import Detail from "./detail";
import Review from "./review";
import Qna from "./qna";

const Product = ({ match }) => {
  const today = new Date();
  const todayYmd =
    String(today.getFullYear()) +
    String(
      today.getMonth() + 1 < 10
        ? "0" + String(today.getMonth() + 1)
        : String(today.getMonth() + 1)
    ) +
    String(
      today.getDate() + 1 < 10
        ? "0" + String(today.getDate())
        : String(today.getDate())
    );

  const [date, setDate] = useState(todayYmd);
  const [classData, setClassData] = useState({});
  const [scheduleArray, setScheduleArray] = useState([]);
  const [content, setContent] = useState("detail");
  const [selectedSchedule, setSelectedSchedule] = useState(0);
  const [personnel, setPersonnel] = useState(1);

  useEffect(async () => {
    const id = match.params.product;
    console.log(match);
    try {
      const response = await axios.post("/api/product", {
        id,
      });
      setClassData(response.data);
      getSchedule(response.data.id);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getSchedule = useCallback(async (v) => {
    try {
      const response = await axios.post("/api/schedule", {
        classId: v,
      });
      console.log(response.data);
      setScheduleArray(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onChangeDate = useCallback((v) => {
    setDate(v);
  }, []);

  const selectSchedule = useCallback((e) => {
    setSelectedSchedule(e.target.value);
  }, []);

  const onClickNav = useCallback((v) => {
    setContent(v);
  }, []);

  const onClickSelectNumberButton = useCallback(
    (v) => {
      if (v === "inc") {
        setPersonnel(personnel + 1);
      }
      if (v === "dec" && personnel > 1) {
        setPersonnel(personnel - 1);
      }
    },
    [personnel]
  );

  const test = useCallback(() => {
    console.log(selectedSchedule);
  }, [selectedSchedule]);

  const clickedSchedule = scheduleArray.map((v) => {
    if (v.time.substring(0, 8) == date) {
      return (
        <option value={v.id}>
          {v.time.substring(8, 12)} ~ {v.time.substring(12, 16)} ---
          {v.reserved} / {v.personnel}
        </option>
      );
    }
  });

  return (
    <Container>
      <Info>
        <div className="info">
          <img
            src={
              classData.img
                ? classData.img.replace(/\\/gi, "/").replace(/public/gi, "")
                : null
            }
          />
          <div className="title">{classData.name}</div>
        </div>
        <div className="reserve">
          <div className="title">클래스일정</div>
          <div className="calendar">
            <Calendar
              scheduleArray={scheduleArray}
              onChangeDate={onChangeDate}
            />
          </div>
          <select onChange={selectSchedule} defaultValue={0}>
            <option value="0">날짜선택</option>
            {clickedSchedule}
          </select>

          <div className="number">
            <div className="selectNumber">
              <div
                className="selectNumberButton"
                onClick={() => onClickSelectNumberButton("dec")}
              >
                -
              </div>
              <div>{personnel}</div>
              <div
                className="selectNumberButton"
                onClick={() => onClickSelectNumberButton("inc")}
              >
                +
              </div>
            </div>
            <div onClick={test}>숫자다</div>
          </div>
          <div className="submit">
            <div>버튼</div>
          </div>
        </div>
      </Info>
      <Nav>
        <div onClick={() => onClickNav("detail")}>상세정보</div>
        <div onClick={() => onClickNav("review")}>리뷰</div>
        <div onClick={() => onClickNav("qna")}>Q&A</div>
      </Nav>
      {classData.id ? (
        <div className="routes">
          {content == "detail" ? (
            <Detail detailArray={classData.detail} />
          ) : content == "review" ? (
            <Review />
          ) : (
            <Qna />
          )}
        </div>
      ) : null}
    </Container>
  );
};

export default Product;
