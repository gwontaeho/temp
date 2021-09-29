import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../../components/calendar";

import {
  Container,
  Header,
  Info,
  AddSchedule,
  Schedule,
  Detail,
} from "./styles";
import axios from "axios";

const Class = ({ match }) => {
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

  const [data, setData] = useState({});
  const [detail, setDetail] = useState([]);
  const [date, setDate] = useState(todayYmd); // 클릭된 날짜 (기본값 오늘)
  const [hour, setHour] = useState("00"); // 스케줄 시작 시각
  const [endHour, setEndHour] = useState("00"); // 스케줄 종료 시각
  const [minute, setMinute] = useState("00"); // 스케줄 시작 분
  const [endMinute, setEndMinute] = useState("00"); // 스케줄 종료 분
  const [personnel, setPersonnel] = useState(1); // 스케줄 인원
  const [scheduleArray, setScheduleArray] = useState([]); // 스케줄 데이터
  const [selectedScheduleArray, setSelectedScheduleArray] = useState([]);

  //클래스 데이터 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/classes/class",
          {
            index: match.params.index,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        console.log("----------");
        console.log(response.data);
        setData(response.data);
        setDetail(JSON.parse(response.data.detail));
        loadSchedule(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let ary = [];
    scheduleArray.forEach((v) => {
      if (v.time.substring(0, 8) === date) ary.push(v);
    });
    ary.sort((a, b) => a.time - b.time);
    setSelectedScheduleArray(ary);
  }, [date, scheduleArray]);

  // 스케줄 데이터 요청
  const loadSchedule = useCallback(async (v) => {
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

  // 스케줄 추가
  const onClickAdd = useCallback(async () => {
    const start = hour + minute;
    const end = endHour + endMinute;

    if (date < todayYmd) {
      return alert("지난 날짜는 추가할 수 없습니다.");
    } else if (Number(start) >= Number(end)) {
      return alert("클래스 시작시간이 종료시간보다 큽니다.");
    } else if (personnel <= 0 || personnel == null) {
      return alert("모집 인원을 설정해주세요");
    }

    try {
      const response = await axios.post(
        "/api/schedule/add",
        {
          time: date + start + end,
          personnel,
          classId: data.id,
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
    loadSchedule(data.id);
  }, [data, date, hour, minute, endHour, endMinute, personnel, loadSchedule]);

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
  const onChangePersonnel = useCallback((e) => {
    setPersonnel(e.target.value);
  }, []);

  const selectedScheduleList = selectedScheduleArray.map((v) => {
    return (
      <div className="schedule">
        <div className="item">
          <div>
            {v.time.substring(8, 10) +
              " : " +
              v.time.substring(10, 12) +
              " ~ " +
              v.time.substring(12, 14) +
              " : " +
              v.time.substring(14, 16)}
          </div>
          <div>
            {v.reserved} / {v.personnel}
          </div>
          <div>{v.state === 0 ? "진행 중" : "종료"}</div>
        </div>
        <Link to={`/info/schedules/${v.id}`}>상세</Link>
      </div>
    );
  });

  const details = detail.map((v) => {
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
      <Header>클래스 상세</Header>
      {Object.keys(data).length === 0 ? null : (
        <React.Fragment>
          <Info>
            <img src={data.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
            <div>
              <div className="info">
                <div>
                  <div className="title">클래스 명</div>
                  <div>{data.name}</div>
                </div>
                <div>
                  <div className="title">수강료</div>
                  <div>
                    <div>{data.price}</div>
                  </div>
                </div>
                <div>
                  <div className="title">수강 시간</div>
                  <div>{data.time}분</div>
                </div>
                <div>
                  <div className="title">주소</div>
                  <div className="address">
                    {data.address === "&&"
                      ? null
                      : data.address.split("&")[1] +
                        " " +
                        data.address.split("&")[2]}
                  </div>
                </div>
              </div>
              <div className="btn">
                <Link to={`/info/class/modify/${data.index}`}>수정하기</Link>
              </div>
            </div>
          </Info>
        </React.Fragment>
      )}
      <Header>클래스 일정</Header>
      <Schedule>
        <div className="calendar">
          <Calendar scheduleArray={scheduleArray} onChangeDate={onChangeDate} />
        </div>
        <div className="scheduleList">
          <div className="clickedDate">
            <div>
              {date.substring(0, 4) +
                " / " +
                date.substring(4, 6) +
                " / " +
                date.substring(6, 8)}
            </div>
            <div>{"총 " + selectedScheduleArray.length + "건"}</div>
          </div>
          <div>{selectedScheduleList}</div>
        </div>
      </Schedule>
      <AddSchedule>
        <div>수강시간 :</div>
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
        <div>부터</div>
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
        <div>까지</div>
        <input
          type="number"
          value={personnel}
          onChange={onChangePersonnel}
          min="1"
          placeholder="모집인원"
        />
        <div>명</div>
        <div onClick={onClickAdd}>일정 추가</div>
      </AddSchedule>
      <Detail>
        <Header>상세 정보</Header>
        <div className="details">{details}</div>
      </Detail>
    </Container>
  );
};

export default Class;
