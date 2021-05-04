import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../components/calendar";

import { Container, Info, AddSchedule, Schedule, Detail } from "./styles";
import axios from "axios";

const ClassInfo = ({ match }) => {
  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];
  const minutes = ["00", "10", "20", "30", "40", "50"];
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

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [classId, setClassId] = useState(0);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [text, setText] = useState([]);
  const [date, setDate] = useState(todayYmd); // 클릭된 날짜 (기본값 오늘)
  const [hour, setHour] = useState("00"); // 스케줄 시작 시각
  const [minute, setMinute] = useState("00"); // 스케줄 시작 분
  const [endHour, setEndHour] = useState("00"); // 스케줄 종료 시각
  const [endMinute, setEndMinute] = useState("00"); // 스케줄 종료 분
  const [students, setStudents] = useState(1); // 스케줄 인원
  const [schedule, setSchedule] = useState([]); // 스케줄 데이터
  const [modifyInfo, setModifyInfo] = useState(false);

  useEffect(() => {
    console.log(match);
    loadClassInfo();
  }, []);

  // 클래스 데이터 요청
  const loadClassInfo = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/classinfo",
        {
          index: match.params.index,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      setClassId(response.data.id);
      setImg(response.data.img.replace(/\\/gi, "/").replace(/public/gi, ""));
      setName(response.data.class);
      setPrice(response.data.price);
      setTime(response.data.time);
      setText(JSON.parse(response.data.text));
      loadSchedule(response.data.id);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 스케줄 데이터 요청
  const loadSchedule = useCallback(
    async (v) => {
      try {
        const response = await axios.post(
          "/api/loadschedule",
          {
            classId: v,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        setSchedule(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [classId]
  );

  // 스케줄 추가
  const onClickAdd = useCallback(async () => {
    const start = hour + minute;
    const end = endHour + endMinute;
    if (Number(start) >= Number(end) || students <= 0 || students == null) {
      if (Number(start) >= Number(end))
        return alert("클래스 시작시간이 종료시간보다 큽니다.");
      else return alert("모집 인원을 설정해주세요");
    }
    try {
      const response = await axios.post(
        "/api/addschedule",
        {
          date,
          start,
          end,
          students,
          classId,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    loadSchedule(classId);
  }, [date, hour, minute, endHour, endMinute, students, classId, loadSchedule]);

  // 스케줄 삭제
  const onClickRemove = useCallback(
    async (v) => {
      try {
        const response = await axios.post(
          "/api/removeschedule",
          {
            id: v.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      loadSchedule(classId);
    },
    [classId, loadSchedule]
  );

  const onClickModifyInfo = useCallback(() => {
    setModifyInfo(true);
  }, []);

  const onClickCheck = useCallback(async () => {
    const newName = document.querySelector(".modifyNameInput").value;
    const newPrice = document.querySelector(".modifyPriceInput").value;
    const newTime = document.querySelector(".modifyTimeInput").value;

    if (name == newName && price == newPrice && time == newTime)
      return setModifyInfo(false);
    try {
      const response = await axios.post(
        "/api/modifyclassinfo",
        {
          classId,
          newName,
          newPrice,
          newTime,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    loadClassInfo();
    setModifyInfo(false);
  }, [classId, name, price, time]);

  const onClickCancle = useCallback(() => {
    setModifyInfo(false);
  }, []);

  const onChangeDate = useCallback((v) => {
    setDate(v);
  }, []);
  const onChangeHour = useCallback((e) => {
    setHour(e.target.value);
  }, []);
  const onChangeMinute = useCallback((e) => {
    setMinute(e.target.value);
  }, []);
  const onChangeEndHour = useCallback((e) => {
    setEndHour(e.target.value);
  }, []);
  const onChangeEndMinute = useCallback((e) => {
    setEndMinute(e.target.value);
  }, []);
  const onChangeStudents = useCallback((e) => {
    setStudents(e.target.value);
  }, []);

  // 클릭된 스케줄
  const clickedSchedule = schedule.map((v) => {
    if (v.date == date) {
      return (
        <div className="schedule">
          <div style={{ display: "flex" }}>
            <div>
              {v.start} ~ {v.end} ---
            </div>
            <div>
              {v.booked} / {v.students}
            </div>
          </div>
          <div
            onClick={() => {
              onClickRemove(v);
            }}
          >
            삭제
          </div>
        </div>
      );
    }
  });

  const details = text.map((v) => {
    return (
      <div className="detail">
        <div className="detailTitle">{v.title}</div>
        <div className="detailText">
          <pre>{v.text}</pre>
        </div>
      </div>
    );
  });

  return (
    <Container>
      <Info>
        <img src={img ? img : null} />
        <div>
          <div className="title">
            {!modifyInfo ? (
              name
            ) : (
              <input
                type="text"
                className="modifyNameInput"
                defaultValue={name}
              />
            )}
          </div>
          {!modifyInfo ? (
            <div>
              <div className="text">
                <div>수강료</div>
                {price}원
              </div>
              <div className="text">
                <div>수강시간</div>
                {time}분
              </div>
            </div>
          ) : (
            <div>
              <div className="text">
                <div>수강료</div>
                <input
                  type="text"
                  className="modifyPriceInput"
                  defaultValue={price}
                />
              </div>
              <div className="text">
                <div>수강시간</div>
                <input
                  type="text"
                  className="modifyTimeInput"
                  defaultValue={time}
                />
              </div>
            </div>
          )}

          <div className="btn">
            {!modifyInfo ? <div onClick={onClickModifyInfo}>수정</div> : null}
            {modifyInfo ? <div onClick={onClickCheck}>확인</div> : null}
            {modifyInfo ? <div onClick={onClickCancle}>취소</div> : null}
          </div>
        </div>
      </Info>
      <Schedule>
        <div className="title">클래스 일정</div>
        <div className="scheduleContainer">
          <div className="calendar">
            <Calendar schedule={schedule} onChangeDate={onChangeDate} />
          </div>
          <div className="scheduleList">
            <div className="clickedDate">{date} 일정목록</div>
            <div>{clickedSchedule}</div>
          </div>
        </div>
        <AddSchedule>
          시작시간
          <select onChange={onChangeHour}>
            {hours.map((v) => {
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>
          <select onChange={onChangeMinute}>
            {minutes.map((v) => {
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>
          종료시간
          <select onChange={onChangeEndHour}>
            {hours.map((v) => {
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>
          <select onChange={onChangeEndMinute}>
            {minutes.map((v) => {
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            value={students}
            onChange={onChangeStudents}
            min="1"
            placeholder="모집인원"
          />
          <div onClick={onClickAdd}>일정 추가</div>
        </AddSchedule>
      </Schedule>

      <Detail>
        <div className="title">상세정보</div>
        <div className="details">{details}</div>
      </Detail>
    </Container>
  );
};

export default ClassInfo;
