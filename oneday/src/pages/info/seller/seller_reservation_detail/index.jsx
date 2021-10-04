import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Container, Header, Detail } from "./styles";

import axios from "axios";

const SellerReservationDetail = ({ match }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/reservation/history/detail",
          {
            id: match.params.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(match.params.id);
  }, []);

  const onClickCancel = useCallback(async () => {
    const result = window.confirm("예약을 취소하시겠습니까?");

    if (result) {
      try {
        const response = await axios.post(
          "/api/reservation/cancel",
          {
            reservationId: data.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        window.alert("예약이 취소되었습니다.");
        window.location.reload();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [data]);

  const onClickConfirm = useCallback(async () => {
    const result = window.confirm("예약을 확정하시겠습니까?");

    if (result) {
      try {
        const response = await axios.post(
          "/api/reservation/confirm",
          {
            reservationId: data.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        window.alert("예약이 확정되었습니다.");
        window.location.reload();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [data]);

  return (
    <Container>
      <Header>예약 상세</Header>
      {Object.keys(data).length === 0 ? null : (
        <React.Fragment>
          <Detail>
            <div className="title">
              <div>클래스 명</div>
              <div>수강 일자</div>
              <div>예약 일자</div>
              <div>수강 인원</div>
              <div>예약 인원</div>
              <div>예약 상태</div>
            </div>
            <div>
              <div>{data.class.name}</div>
              <div>
                {data.schedule.time.substring(0, 4) +
                  "-" +
                  data.schedule.time.substring(4, 6) +
                  "-" +
                  data.schedule.time.substring(6, 8) +
                  " / " +
                  data.schedule.time.substring(8, 10) +
                  ":" +
                  data.schedule.time.substring(10, 12) +
                  " ~ " +
                  data.schedule.time.substring(12, 14) +
                  ":" +
                  data.schedule.time.substring(14, 16)}
              </div>
              <div>
                {data.createdAt.substring(0, 10) +
                  " / " +
                  data.createdAt.substring(11, 16)}
              </div>
              <div>{data.schedule.personnel}</div>
              <div>{data.personnel}</div>
              <div>
                <div>
                  {data.state === 0
                    ? "예약 중"
                    : data.state === 1
                    ? "수강 완료"
                    : data.state === 2
                    ? "취소 요청"
                    : data.state === 3
                    ? "취소"
                    : "예약 대기"}
                </div>
              </div>
            </div>
            <div className="btns">
              {data.state === 0 || data.state === 2 || data.state === 4 ? (
                <div onClick={onClickCancel}>예약 취소</div>
              ) : null}
              {data.state === 4 ? (
                <div onClick={onClickConfirm}>예약 확정</div>
              ) : null}
            </div>
          </Detail>
          <Header>예약자 정보</Header>
          <Detail>
            <div className="title">
              <div>이름</div>
              <div>연락처</div>
            </div>
            <div>
              <div>{data.name}</div>
              <div>{data.phone}</div>
            </div>
          </Detail>
          <Header>결제 정보</Header>
          <Detail>
            <div className="title">
              <div>결제 금액</div>
            </div>
          </Detail>
        </React.Fragment>
      )}
    </Container>
  );
};

export default SellerReservationDetail;
