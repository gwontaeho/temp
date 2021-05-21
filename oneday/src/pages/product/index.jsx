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
      setScheduleArray(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onChangeDate = useCallback((v) => {
    setDate(v);
  }, []);

  const onClickNav = useCallback((e) => {
    const value = e.target.getAttribute("value");
    setContent(value);
  }, []);

  const clickedSchedule = scheduleArray.map((v) => {
    if (v.date == date) {
      return (
        <option>
          {v.start} ~ {v.end} ---
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
          <select>
            <option value="">날짜선택</option>
            {clickedSchedule}
          </select>
        </div>
      </Info>
      <Nav>
        <div value="detail" onClick={onClickNav}>
          상세정보
        </div>
        <div value="review" onClick={onClickNav}>
          리뷰
        </div>
        <div value="qna" onClick={onClickNav}>
          Q&A
        </div>
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
