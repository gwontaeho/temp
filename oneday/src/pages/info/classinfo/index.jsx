import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../components/calendar";

import { Container, Info, Schedule, ScheduleList } from "./styles";
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

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [classId, setClassId] = useState();
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [endHour, setEndHour] = useState("00");
  const [endMinute, setEndMinute] = useState("00");
  const [students, setStudents] = useState("1");
  const [schedule, setSchedule] = useState([]);

  useEffect(async () => {
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
      loadSchedule(response.data.id);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onChangeDate = useCallback((e) => {
    setDate(e);
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
        console.log(schedule);
      } catch (error) {
        console.log(error);
      }
    },
    [classId]
  );

  const onClickAdd = useCallback(async () => {
    if (Number(hour + minute) >= Number(endHour + endMinute)) {
      console.log("nope");
    }

    const getYear = String(date.getFullYear());
    const getMonth =
      date.getMonth() + 1 < 10
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    const getDate =
      date.getDate() < 10
        ? "0" + String(date.getDate())
        : String(date.getDate());

    const ymd = getYear + getMonth + getDate;
    const start = hour + minute;
    const end = endHour + endMinute;

    try {
      const response = await axios.post(
        "/api/addschedule",
        {
          ymd,
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
  }, [date, hour, minute, endHour, endMinute, students, classId]);

  const scheduleList = schedule.map((v) => {
    return (
      <ScheduleList>
        <div>{v.ymd}</div>
        <div>{v.start + "~" + v.end}</div>
        모집인원<div>{v.students}</div>
        예약인원<div>{v.booked}</div>
      </ScheduleList>
    );
  });

  return (
    <Container>
      <Info>
        {img ? (
          <img
            src={img}
            style={{
              width: "480px",
              height: "360px",
              objectFit: "cover",
              marginRight: "24px",
            }}
          />
        ) : null}
        <div>
          <div>
            <div>{name}</div>
          </div>
          <div>
            <div>{price}원</div>
          </div>
          <div>
            <div>총 {time}분</div>
          </div>
          <div>
            <div>{students}명</div>
          </div>
        </div>
      </Info>
      <Schedule>
        <div className="title">클래스 일정</div>
        <div className="addClass">
          <DatePicker
            selected={date}
            onChange={onChangeDate}
            dateFormat="yyyy년 MM월 dd일"
            locale={ko}
            minDate={new Date()}
          />
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
            type="text"
            value={students}
            onChange={onChangeStudents}
            placeholder="모집인원"
          />
          <button type="button" onClick={onClickAdd}>
            일정 추가
          </button>
        </div>
        <div>{scheduleList}</div>
      </Schedule>
      <Calendar schedule={schedule} />
    </Container>
  );
};

export default ClassInfo;
