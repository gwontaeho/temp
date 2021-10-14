import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
// import Calendar from "../../../../components/calendar";

import axios from "axios";

import { Container, Header, Item } from "./styles";

const SellerSchedule = () => {
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

  const [data, setData] = useState([]);
  const [date, setDate] = useState(todayYmd); // 클릭된 날짜 (기본값 오늘)
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/schedule/seller",
          {},
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let rAry = [];

    data.forEach((v) => {
      if (v.time.substring(0, 8) === date) {
        rAry.push(v);
      }
    });

    setSelected(rAry);
  }, [data, date]);

  const onChangeDate = useCallback((v) => {
    setDate(v);
  }, []);

  const seletedList = selected.map((v) => {
    return (
      <Link to={`/info/schedule/${v.id}`}>
        <Item>
          <div>{selected.indexOf(v) + 1}</div>
          <div className="name">{v.class.name}</div>
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
            예약 : {v.reserved} / {v.personnel}
          </div>
        </Item>
      </Link>
    );
  });

  return (
    <Container>
      <Header>일정 관리</Header>
      {Object.keys(data).length === 0 ? null : (
        <>
          <div className="calendar">
            {/* <Calendar scheduleArray={data} onChangeDate={onChangeDate} /> */}
          </div>
          <Header>
            {date.substring(4, 6) + "월 " + date.substring(6, 8) + "일"} 수업 총{" "}
            {selected.length}건
          </Header>
          <div>{seletedList}</div>
        </>
      )}
    </Container>
  );
};

export default SellerSchedule;
