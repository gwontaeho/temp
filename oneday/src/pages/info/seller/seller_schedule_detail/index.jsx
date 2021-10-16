import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import {
  Container,
  Header,
  Nav,
  InfoHeader,
  Info,
  List,
  ListHeader,
  Item,
} from "./styles";

const SellerScheduleDetail = (props) => {
  const auth = useSelector((state) => state.auth);

  const [scheduleData, setScheduleData] = useState({});
  const [reservationData, setReservationData] = useState([]);

  useEffect(() => {
    requestScheduleData();
  }, []);

  const requestScheduleData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/schedule/${props.match.params.id}`,
        { headers: { token: auth.token } }
      );
      console.log(response.data);
      setScheduleData(response.data);
      setReservationData(response.data.reservations);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickEnd = useCallback(async () => {
    const result = window.confirm("일정을 종료하시겠습니까?");

    if (result) {
      try {
        const response = await axios.put(
          "/api/schedule",
          {
            id: scheduleData.id,
          },
          {
            headers: {
              token: auth.token,
            },
          }
        );
        console.log(response);
        requestScheduleData();
        window.alert("일정이 종료되었습니다.");
      } catch (error) {
        console.log(error);
      }
    }
  }, [scheduleData]);

  const reservationsList = reservationData.map((v) => {
    return (
      <Item key={v.id}>
        <div>{v.userId}</div>
        <div>{v.name}</div>
        <div>{v.phone}</div>
        <div>
          {v.createdAt.substr(0, 4) +
            ". " +
            v.createdAt.substr(5, 2) +
            ". " +
            v.createdAt.substr(8, 2)}
        </div>
        <div>{v.personnel}</div>
        <div>
          {v.state === 0
            ? "예약 중"
            : v.state === 1
            ? "수강 완료"
            : v.state === 2
            ? "취소 요청"
            : v.state === 3
            ? "취소"
            : "예약 대기"}
        </div>
        <div>
          <Link to={`/info/reservation/${v.id}`}>자세히</Link>
        </div>
      </Item>
    );
  });

  return Object.keys(scheduleData).length === 0 ? null : (
    <Container>
      <Header>일정 상세 내역</Header>
      <Nav>
        {scheduleData.state === 0 ? (
          <div onClick={onClickEnd}>일정 종료</div>
        ) : null}
      </Nav>
      <InfoHeader>
        <div>클래스 정보</div>
        <div>수강 일자</div>
        <div>수강 인원</div>
        <div>상태</div>
      </InfoHeader>
      <Info>
        <div className="info">
          <img
            src={scheduleData.product.img
              .replace(/\\/gi, "/")
              .replace(/public/gi, "")}
          />
          <div>
            <div>{scheduleData.product.category}</div>
            <div>{scheduleData.product.name}</div>
          </div>
        </div>
        <div className="classDate">
          <div>
            {String(scheduleData.ymd).substr(0, 4) +
              ". " +
              String(scheduleData.ymd).substr(4, 2) +
              ". " +
              String(scheduleData.ymd).substr(6, 2)}
          </div>
          <div>
            {scheduleData.start.substr(0, 2) +
              ":" +
              scheduleData.start.substr(2, 2) +
              " ~ " +
              scheduleData.end.substr(0, 2) +
              ":" +
              scheduleData.end.substr(2, 2)}
          </div>
        </div>
        <div className="text">
          {scheduleData.reserved + " / " + scheduleData.personnel}
        </div>
        <div className="text">
          {scheduleData.state === 0 ? "진행 중" : "종료"}
        </div>
      </Info>
      <Header>예약자 정보</Header>
      <List>
        <ListHeader>
          <div>아이디</div>
          <div>이름</div>
          <div>연락처</div>
          <div>예약 일자</div>
          <div>예약 인원</div>
          <div>예약 상태</div>
        </ListHeader>
        {reservationsList}
      </List>
    </Container>
  );
};

export default SellerScheduleDetail;
