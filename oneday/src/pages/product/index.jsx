import React, { useCallback, useEffect, useState } from "react";
import { Container, Info, Nav } from "./styles";
import { useCookies } from "react-cookie";
import qs from "qs";

import axios from "axios";
import Calendar from "../../components/calendar";
import Detail from "./detail";
import Review from "./review";
import Qna from "./qna";

const Product = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

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

  const [type, setType] = useState(0);
  const [date, setDate] = useState(todayYmd);
  const [productData, setProductData] = useState({});
  const [scheduleArray, setScheduleArray] = useState([]);
  const [content, setContent] = useState("detail");
  const [personnel, setPersonnel] = useState(1);
  const [schedulesDisplay, setSchedulesDisplay] = useState("none");
  const [selectedSchedule, setSelectedSchedule] = useState({});

  useEffect(() => {
    requestProductData();
    requestType();
  }, []);

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/product?id=${query.id}`);
      setProductData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestType = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/auth/type",
        {},
        { headers: { token: cookies.token } }
      );
      setType(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (schedulesDisplay !== "none") setSchedulesDisplay("none");
    setPersonnel(1);
  }, [date]);

  const onChangeDate = useCallback((v) => {
    setDate(v);
  }, []);

  const toggleSchedules = useCallback(() => {
    if (schedulesDisplay === "none") {
      let ary = [];
      scheduleArray.forEach((v) => {
        if (v.time.substring(0, 8) === date) ary.push(v);
      });
      if (ary.length === 0) return;
      setSchedulesDisplay("block");
    } else {
      setSchedulesDisplay("none");
    }
  }, [date, schedulesDisplay, scheduleArray]);

  const onClickNav = useCallback((v) => {
    setContent(v);
  }, []);

  const onClickSelectNumberButton = useCallback(
    (v) => {
      if (
        v === "inc" &&
        selectedSchedule.personnel - (selectedSchedule.reserved + personnel) >=
          1
      ) {
        setPersonnel(personnel + 1);
      }
      if (v === "dec" && personnel > 1) {
        setPersonnel(personnel - 1);
      }
    },
    [personnel, selectedSchedule]
  );

  const onClickSchedule = useCallback((v) => {
    console.log(v);
    setSelectedSchedule(v);
    setSchedulesDisplay("none");
  }, []);

  const onClickApply = useCallback(() => {
    if (Object.keys(selectedSchedule).length !== 0) {
      props.history.push({
        pathname: "/reservation",
        state: { productData, schedule: selectedSchedule, personnel },
      });
    } else {
      window.alert("일정을 선택해주세요.");
    }
  }, [productData, selectedSchedule, personnel]);

  const clickedSchedule = scheduleArray.map((v) => {
    if (v.time.substring(0, 8) === date) {
      return (
        <div
          className="schedule"
          onClick={() => {
            if (v.personnel > v.reserved && v.state === 0) onClickSchedule(v);
          }}
          style={{
            color:
              v.personnel <= v.reserved || v.state === 1 ? "lightgray" : "",
          }}
        >
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

  return Object.keys(productData).length === 0 ? null : (
    <Container>
      <Info>
        <div className="info">
          <img
            src={productData.img.replace(/\\/gi, "/").replace(/public/gi, "")}
          />
          <div className="title">{productData.name}</div>
        </div>

        <div className="reserve">
          <div className="calendar">
            <Calendar
              scheduleArray={scheduleArray}
              onChangeDate={onChangeDate}
              type={0}
            />
          </div>

          <div className="scheduleContainer">
            <div className="title_schedule" onClick={toggleSchedules}>
              {schedulesDisplay === "none" ? "일정 선택" : "닫기"}
            </div>
            <div className="schedules" style={{ display: schedulesDisplay }}>
              {clickedSchedule}
            </div>
            <div className="title_schedule">
              {Object.keys(selectedSchedule).length !== 0
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
            <div>{Number(productData.price) * personnel}원</div>
          </div>

          {type === 1 ? (
            <div className="applyButton" onClick={onClickApply}>
              신청하기
            </div>
          ) : null}
        </div>
      </Info>

      <Nav>
        <div onClick={() => onClickNav("detail")}>상세정보</div>
        <div onClick={() => onClickNav("review")}>리뷰</div>
        <div onClick={() => onClickNav("qna")}>Q&A</div>
      </Nav>

      <div className="routes">
        {content === "detail" ? (
          <Detail
            productId={productData.name}
            detailArray={productData.detail}
            address={productData.address}
          />
        ) : content === "review" ? (
          <Review productId={productData.id} />
        ) : (
          <Qna
            productId={productData.id}
            sellerId={productData.sellerId}
            type={type}
          />
        )}
      </div>
    </Container>
  );
};

export default Product;
