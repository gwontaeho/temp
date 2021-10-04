import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import axios from "axios";

import { Container, Header, Detail } from "./styles";

const SellerScheduleDetail = ({ match }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [schedule, setSchedule] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/schedule/detail",
          {
            scheduleId: match.params.id,
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
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.post(
          "/api/reservation/reservations",
          {
            scheduleId: match.params.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        setReservations(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchData2();
  }, []);

  const onClickFinish = useCallback(async () => {
    const result = window.confirm("일정을 종료하시겠습니까?");

    if (result) {
      try {
        const response = await axios.post(
          "/api/schedule/finish",
          {
            scheduleId: schedule.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        window.alert("일정이 종료되었습니다.");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }, [schedule]);

  const reservationsList = reservations.map((v) => {
    return (
      <Detail>
        <div className="title">
          <div>아이디</div>
          <div>이름</div>
          <div>연락처</div>
          <div>예약 인원</div>
          <div>예약 일자</div>
          <div>예약 상태</div>
        </div>
        <div>
          <div>{v.userId}</div>
          <div>{v.name}</div>
          <div>{v.phone}</div>
          <div>{v.personnel}</div>
          <div>{v.createdAt}</div>
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
        </div>
        <div className="btns">
          <Link to={`/info/reservations/${v.id}`}>상세 정보</Link>
        </div>
      </Detail>
    );
  });

  return Object.keys(schedule).length === 0 ? null : (
    <Container>
      <Header>일정 상세</Header>
      <Detail>
        <div className="title">
          <div>클래스 명</div>
          <div>수강료</div>
          <div>수업 일자</div>
          <div>수강 인원</div>
          <div>예약 인원</div>
          <div>일정 상태</div>
        </div>
        <div>
          <div>{schedule.class.name}</div>
          <div>{schedule.class.price}</div>
          <div>
            {schedule.time.substring(0, 4) +
              "-" +
              schedule.time.substring(4, 6) +
              "-" +
              schedule.time.substring(6, 8) +
              " / " +
              schedule.time.substring(8, 10) +
              ":" +
              schedule.time.substring(10, 12) +
              " ~ " +
              schedule.time.substring(12, 14) +
              ":" +
              schedule.time.substring(14, 16)}
          </div>
          <div>{schedule.personnel}</div>
          <div>{schedule.reserved}</div>
          <div>{schedule.state === 0 ? "진행 중" : "종료"}</div>
        </div>
        <div className="btns">
          {schedule.state === 0 ? (
            <div onClick={onClickFinish}>일정 종료</div>
          ) : null}
        </div>
      </Detail>
      <Header>예약자 정보</Header>
      <div>{reservationsList}</div>
    </Container>
  );
};

export default SellerScheduleDetail;
