import React, { useCallback, useEffect, useState } from "react";
import { Container, Head, Body } from "./styles";

const Calendar = (props) => {
  const today = new Date();
  const todayYmd =
    String(today.getFullYear()) +
    String(
      today.getMonth() + 1 < 10
        ? "0" + String(today.getMonth() + 1)
        : String(today.getMonth() + 1)
    ) +
    String(
      today.getDate() < 10
        ? "0" + String(today.getDate())
        : String(today.getDate())
    );

  const [ym, setYm] = useState(today);
  const [empty, setEmpty] = useState([]);
  const [body, setBody] = useState([]);
  const [scheduleDateArray, setScheduleDateArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    createBody();
  }, [ym]);

  useEffect(() => {
    let newScheduleDateArray = [];
    props.scheduleArray.map((v) => {
      newScheduleDateArray.push(v.time.substring(0, 8));
    });
    setScheduleDateArray(newScheduleDateArray);
  }, [props.scheduleArray]);

  const createBody = useCallback(() => {
    const firstDay = new Date(ym.setDate(1)).getDay();
    const lastDate = new Date(
      new Date(ym.getFullYear(), ym.getMonth() + 1).setDate(0)
    ).getDate();

    let newEmpty = [];
    for (let i = 0; i < firstDay; i++) {
      newEmpty.push("");
    }
    let newBody = [];
    for (let i = 0; i < lastDate; i++) {
      const year = String(ym.getFullYear());
      const month =
        ym.getMonth() + 1 < 10
          ? "0" + String(ym.getMonth() + 1)
          : String(ym.getMonth() + 1);
      const date = i + 1 < 10 ? "0" + String(i + 1) : String(i + 1);
      newBody.push(year + month + date);
    }
    setEmpty(newEmpty);
    setBody(newBody);
  }, [ym]);

  const onClickPrev = useCallback(() => {
    setYm(new Date(ym.getFullYear(), ym.getMonth() - 1));
  }, [ym]);

  const onClickNext = useCallback(() => {
    setYm(new Date(ym.getFullYear(), ym.getMonth() + 1));
  }, [ym]);

  const onClickDate = useCallback((e) => {
    const thisDate = e.target.getAttribute("value");
    props.onChangeDate(thisDate);
    setSelectedDate(thisDate);
    console.log(thisDate);
  }, []);

  const emptyList = empty.map((v) => {
    return <div></div>;
  });

  const bodyList = body.map((v) => {
    return (
      <React.Fragment>
        <div
          className={
            "date" +
            (scheduleDateArray.includes(v) ? " includes" : "") +
            (v === todayYmd ? " today" : "") +
            (selectedDate === v ? " selected" : "")
          }
          value={v}
          onClick={v < todayYmd && props.type === 0 ? null : onClickDate}
        >
          {v.substring(6, 8)}
        </div>
      </React.Fragment>
    );
  });

  return (
    <Container>
      <Head>
        {String(ym.getFullYear()) + String(ym.getMonth()) <=
          String(today.getFullYear()) + String(today.getMonth()) &&
        props.type === 0 ? (
          <div></div>
        ) : (
          <div onClick={onClickPrev}>이전</div>
        )}
        <div>{ym.getFullYear() + "년 " + (ym.getMonth() + 1) + "월"}</div>
        <div onClick={onClickNext}>다음</div>
      </Head>
      <Body>
        <div className="days">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        <div className="dates">
          {emptyList}
          {bodyList}
        </div>
      </Body>
    </Container>
  );
};

export default Calendar;
