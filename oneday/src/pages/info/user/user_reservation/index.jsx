import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import { Container, Nav, Header, List, Item } from "./styles";

const UserReservation = (props) => {
  const auth = useSelector((state) => state.auth);

  const [reservationData, setReservationData] = useState([]);
  const [state, setState] = useState(0);

  useEffect(() => {
    requestReservationData();
  }, [state]);

  const requestReservationData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/reservation?state=${state}`, {
        headers: { token: auth.token },
      });
      setReservationData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  const reservationList = reservationData.map((v) => {
    const scheduleYmd =
      String(v.schedule.ymd).substr(0, 4) +
      ". " +
      String(v.schedule.ymd).substr(4, 2) +
      ". " +
      String(v.schedule.ymd).substr(6, 2);
    const scheduleTime =
      v.schedule.start.substr(0, 2) +
      ":" +
      v.schedule.start.substr(2, 2) +
      " ~ " +
      v.schedule.end.substr(0, 2) +
      ":" +
      v.schedule.end.substr(2, 2);
    const reservationYmd =
      v.createdAt.substr(0, 4) +
      ". " +
      v.createdAt.substr(5, 2) +
      ". " +
      v.createdAt.substr(8, 2);
    return (
      <Item key={v.id}>
        <div className="info">
          <img
            src={v.product.img.replace(/\\/gi, "/").replace(/public/gi, "")}
          />
          <div>
            <div>
              [
              {v.product.category === "flower"
                ? "플라워"
                : v.product.category === "art"
                ? "미술"
                : v.product.category === "cooking"
                ? "요리"
                : v.product.category === "handmade"
                ? "수공예"
                : v.product.category === "activity"
                ? "액티비티"
                : "기타"}
              ]
            </div>
            <div>{v.product.name}</div>
          </div>
        </div>
        <div className="text">
          <div>{scheduleYmd}</div>
          <div>{scheduleTime}</div>
        </div>
        <div className="text">{reservationYmd}</div>
        <div className="text">
          <div>
            {v.state === 0
              ? "예약 중"
              : v.state === 1 || v.state === 5
              ? "수강 완료"
              : v.state === 2
              ? "취소 요청"
              : v.state === 3
              ? "취소"
              : "예약 대기"}
          </div>
        </div>
        <div className="text">
          <Link to={`/info/reservation/${v.id}`}>자세히</Link>
          <div>{v.state === 1 ? "후기를 작성해주세요" : null}</div>
        </div>
      </Item>
    );
  });

  return (
    <Container>
      <Nav>
        <div onClick={() => setState(4)}>
          <div>예약 대기</div>
          <div>{props.reservationCountData.e}</div>
        </div>
        <div onClick={() => setState(0)}>
          <div>예약 중</div>
          <div>{props.reservationCountData.a}</div>
        </div>
        <div onClick={() => setState(1)}>
          <div>수강 완료</div>
          <div>
            {props.reservationCountData.b + props.reservationCountData.f}
          </div>
        </div>
        <div onClick={() => setState(2)}>
          <div>취소 요청</div>
          <div>{props.reservationCountData.c}</div>
        </div>
        <div onClick={() => setState(3)}>
          <div>취소</div>
          <div>{props.reservationCountData.d}</div>
        </div>
      </Nav>
      <Header>
        <div>클래스 정보</div>
        <div>수강 일자</div>
        <div>예약 일자</div>
        <div>예약 상태</div>
      </Header>
      <List>{reservationList}</List>
    </Container>
  );
};

export default UserReservation;
