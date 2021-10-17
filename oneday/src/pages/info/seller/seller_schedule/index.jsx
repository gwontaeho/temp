import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Calendar from "./calendar";

import axios from "axios";

import { Container, Header, State, CalendarNList, List, Item } from "./styles";

const SellerSchedule = (props) => {
  const auth = useSelector((state) => state.auth);

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

  const [scheduleData, setScheduleData] = useState([]);
  const [ym, setYm] = useState(todayYmd.substr(0, 6));
  const [date, setDate] = useState(todayYmd); // 클릭된 날짜 (기본값 오늘)

  useEffect(() => {
    requestScheduleData();
    console.log(props);
  }, [ym]);

  const requestScheduleData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/schedule?productId=0&ym=${ym}`, {
        headers: { token: auth.token },
      });
      setScheduleData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [ym]);

  const onChangeYm = useCallback((v) => {
    setYm(v);
  }, []);

  const onChangeDate = useCallback((v) => {
    setDate(v);
  }, []);

  const scheduleList = scheduleData.map((v) => {
    if (String(v.ymd) === date)
      return (
        <Item key={v.id}>
          <div>{v.product.name}</div>
          <div>{`${v.start.substr(0, 2)} : ${v.start.substr(
            2,
            2
          )} ~ ${v.end.substr(0, 2)} : ${v.end.substr(2, 2)}`}</div>
          <div>{v.reserved + "/" + v.personnel}</div>
          <div>{v.state === 0 ? "진행 중" : "종료"}</div>
          <div>
            <Link to={`/info/schedule/${v.id}`}>자세히</Link>
          </div>
        </Item>
      );
  });

  return (
    <Container>
      <Header>일정 관리</Header>
      <State>
        <div>
          {"진행중인 일정 : " +
            scheduleData.reduce(
              (cnt, element) => cnt + (element.state === 0),
              0
            )}
        </div>
        <div>
          {"종료된 일정 : " +
            scheduleData.reduce(
              (cnt, element) => cnt + (element.state === 1),
              0
            )}
        </div>
        <div>아직 종료되지 않은 일정이 있습니다</div>
      </State>
      <CalendarNList>
        <div className="calendar">
          <Calendar
            scheduleData={scheduleData}
            onChangeDate={onChangeDate}
            onChangeYm={onChangeYm}
          />
        </div>
        <List>
          <Item>
            <div>클래스 명</div>
            <div>시간</div>
            <div>인원</div>
            <div>상태</div>
          </Item>
          {scheduleList}
        </List>
      </CalendarNList>
    </Container>
  );
};

export default SellerSchedule;
