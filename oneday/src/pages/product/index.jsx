import { Container, Info, Nav } from "./styles";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import Calendar from "../../components/calendar";
import Detail from "./detail";
import Review from "./review";
import Qna from "./qna";

const Product = ({ match, history }) => {
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
  const [personnel, setPersonnel] = useState(1);
  const [schedulesDisplay, setSchedulesDisplay] = useState("none");
  const [selectedSchedule, setSelectedSchedule] = useState({});

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

  useEffect(() => {
    if (schedulesDisplay != "none") setSchedulesDisplay("none");
  }, [date]);

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

  const toggleSchedules = useCallback(() => {
    if (schedulesDisplay == "none") {
      let ary = [];
      scheduleArray.forEach((v) => {
        if (v.time.substring(0, 8) == date) ary.push(v);
      });
      if (ary.length == 0) return;
      setSchedulesDisplay("block");
    } else {
      setSchedulesDisplay("none");
    }
  }, [date, schedulesDisplay]);

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

  const onClickSchedule = useCallback((v) => {
    setSelectedSchedule(v);
    setSchedulesDisplay("none");
  }, []);

  const onClickApply = useCallback(() => {
    history.push({
      pathname: "/reservation",
      state: { classData, schedule: selectedSchedule, personnel },
    });
    console.log(selectedSchedule);
    console.log(personnel);
    console.log(classData);
  }, [classData, selectedSchedule, personnel]);

  const clickedSchedule = scheduleArray.map((v) => {
    if (v.time.substring(0, 8) == date) {
      return (
        <div className="schedule" onClick={() => onClickSchedule(v)}>
          {v.time.substring(8, 10) +
            ":" +
            v.time.substring(10, 12) +
            " ~ " +
            v.time.substring(12, 14) +
            ":" +
            v.time.substring(14, 16) +
            " [" +
            v.reserved +
            " / " +
            v.personnel +
            "]"}
        </div>
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

          <div className="scheduleContainer">
            <div className="title_schedule" onClick={toggleSchedules}>
              {schedulesDisplay == "none" ? "일정 선택" : "닫기"}
            </div>
            <div className="schedules" style={{ display: schedulesDisplay }}>
              {clickedSchedule}
            </div>
            <div className="title_schedule">
              {Object.keys(selectedSchedule).length != 0
                ? selectedSchedule.time.substring(0, 4) +
                  ". " +
                  selectedSchedule.time.substring(4, 6) +
                  ". " +
                  selectedSchedule.time.substring(6, 8) +
                  " " +
                  selectedSchedule.time.substring(8, 10) +
                  ":" +
                  selectedSchedule.time.substring(10, 12) +
                  " ~ " +
                  selectedSchedule.time.substring(12, 14) +
                  ":" +
                  selectedSchedule.time.substring(14, 16) +
                  " (" +
                  selectedSchedule.reserved +
                  " / " +
                  selectedSchedule.personnel +
                  ") 명"
                : "일정을 선택해주세요"}
            </div>
          </div>

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
            <div>{Number(classData.price) * personnel}원</div>
          </div>

          <div className="applyButton" onClick={onClickApply}>
            신청하기
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
