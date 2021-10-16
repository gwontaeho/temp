import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import constants from "./constants";

import Calendar from "./calendar/index";

import {
  Container,
  Header,
  Product,
  Image,
  InfoHeaderA,
  InfoHeaderB,
  State,
  List,
  Item,
  AddSchedule,
  Schedule,
  Detail,
} from "./styles";

const ClassDetail = ({ match }) => {
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

  const [productData, setProductData] = useState({});
  const [detail, setDetail] = useState([]);
  const [ym, setYm] = useState(todayYmd.substr(0, 6));
  const [scheduleData, setScheduleData] = useState([]); // 스케줄 데이터

  const [date, setDate] = useState(todayYmd); // 클릭된 날짜 (기본값 오늘)

  const [hour, setHour] = useState("00"); // 스케줄 시작 시각
  const [minute, setMinute] = useState("00"); // 스케줄 시작 분
  const [endHour, setEndHour] = useState("00"); // 스케줄 종료 시각
  const [endMinute, setEndMinute] = useState("00"); // 스케줄 종료 분
  const [personnel, setPersonnel] = useState(1); // 스케줄 인원

  //클래스 데이터 요청
  useEffect(() => {
    requestProductData();
  }, []);

  useEffect(() => {
    requestScheduleData(match.params.id);
  }, [ym]);

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/product/seller/${match.params.id}`,
        { headers: { token: auth.token } }
      );
      console.log(response.data);
      setProductData(response.data);
      setDetail(JSON.parse(response.data.detail));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 스케줄 데이터 요청
  const requestScheduleData = useCallback(
    async (productId) => {
      console.log("스케줄 데이터 요청");
      try {
        const response = await axios.get(
          `/api/schedule?productId=${productId}&ym=${ym}`,
          { headers: { token: auth.token } }
        );
        setScheduleData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [ym]
  );

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
        "/api/schedule",
        {
          ymd: Number(date),
          start,
          end,
          personnel,
          productId: productData.id,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    requestScheduleData(productData.id);
  }, [
    productData,
    date,
    hour,
    minute,
    endHour,
    endMinute,
    personnel,
    requestScheduleData,
  ]);

  const onChangeYm = useCallback((v) => {
    setYm(v);
  }, []);

  const onChangeDate = useCallback((v) => {
    console.log(v);
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

  const scheduleList = scheduleData.map((v) => {
    if (String(v.ymd) === date)
      return (
        <Item key={v.id}>
          <div>
            {v.start.substr(0, 2) +
              " : " +
              v.start.substr(2, 2) +
              " ~ " +
              v.end.substr(0, 2) +
              " : " +
              v.end.substr(2, 2)}
          </div>
          <div>
            {v.reserved} / {v.personnel}
          </div>
          <div>{v.state === 0 ? "진행 중" : "종료"}</div>
          <div>
            <Link to={`/info/schedule/${v.id}`}>자세히</Link>
          </div>
        </Item>
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

  return Object.keys(productData).length === 0 ? null : (
    <Container>
      <Header>클래스 상세</Header>
      <Product>
        <Image>
          <img
            src={productData.img.replace(/\\/gi, "/").replace(/public/gi, "")}
          />
        </Image>
        <div className="info">
          <InfoHeaderA>
            <div>클래스 명</div>
            <div>주소</div>
          </InfoHeaderA>
          <InfoHeaderA>
            <div>{productData.name}</div>
            <div>
              {productData.address === "&&"
                ? null
                : productData.address.split("&")[1] +
                  " " +
                  productData.address.split("&")[2]}
            </div>
          </InfoHeaderA>
          <InfoHeaderB>
            <div>수강료</div>
            <div>수강시간</div>
            <div>판매</div>
            <div>평점</div>
            <div>리뷰</div>
          </InfoHeaderB>
          <InfoHeaderB>
            <div>{productData.price} 원</div>
            <div>{productData.time} 분</div>
            <div>{productData.sold} 회</div>
            <div>평점</div>
            <div>리뷰</div>
          </InfoHeaderB>
          <Link to={`update/${productData.id}`}>수정</Link>
        </div>
      </Product>
      <Header>클래스 일정</Header>
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
      <Schedule>
        <div className="calendar">
          <Calendar
            scheduleData={scheduleData}
            onChangeDate={onChangeDate}
            onChangeYm={onChangeYm}
          />
        </div>
        <List>
          <Item>
            <div>시간</div>
            <div>인원</div>
            <div>상태</div>
          </Item>
          {scheduleList}
        </List>
      </Schedule>
      <Header>일정 생성</Header>
      <AddSchedule>
        <div>{`${date.substr(0, 4)}. ${date.substr(4, 2)}. ${date.substr(
          6,
          2
        )}`}</div>
        <select onChange={onChangeHour}>
          {constants.hours.map((v) => {
            return (
              <option key={v} value={v}>
                {v}
              </option>
            );
          })}
        </select>
        <select onChange={onChangeMinute}>
          {constants.minutes.map((v) => {
            return (
              <option key={v} value={v}>
                {v}
              </option>
            );
          })}
        </select>
        <div>부터</div>
        <select onChange={onChangeEndHour}>
          {constants.hours.map((v) => {
            return (
              <option key={v} value={v}>
                {v}
              </option>
            );
          })}
        </select>
        <select onChange={onChangeEndMinute}>
          {constants.minutes.map((v) => {
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
        <div onClick={onClickAdd}>생성</div>
      </AddSchedule>
      <Detail>
        <Header>상세 정보</Header>
        <div className="details">{details}</div>
      </Detail>
    </Container>
  );
};

export default ClassDetail;
