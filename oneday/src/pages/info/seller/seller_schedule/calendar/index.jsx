import React, { useCallback, useEffect, useState } from "react";
import { Container, Head, Days, Dates } from "./styles";

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

  const [date, setDate] = useState(today);
  const [empty, setEmpty] = useState([]);
  const [body, setBody] = useState([]);
  const [scheduleDate, setScheduleDate] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    console.log(props.scheduleData);
    createBody();
  }, [date]);

  useEffect(() => {
    let newScheduleDate = [];
    props.scheduleData.forEach((v) => {
      if (v.state === 0 && v.reserved < v.personnel)
        newScheduleDate.push(v.ymd);
    });
    const set = new Set(newScheduleDate);
    newScheduleDate = [...set];
    setScheduleDate(newScheduleDate);
  }, [props.scheduleData]);

  const createBody = useCallback(() => {
    const firstDay = new Date(date.setDate(1)).getDay();
    const lastDate = new Date(
      new Date(date.getFullYear(), date.getMonth() + 1).setDate(0)
    ).getDate();

    let newEmpty = [];
    for (let i = 0; i < firstDay; i++) {
      newEmpty.push("");
    }
    let newBody = [];
    for (let i = 0; i < lastDate; i++) {
      const bodyYear = String(date.getFullYear());
      const bodyMonth =
        date.getMonth() + 1 < 10
          ? "0" + String(date.getMonth() + 1)
          : String(date.getMonth() + 1);
      const bodyDate = i + 1 < 10 ? "0" + String(i + 1) : String(i + 1);
      newBody.push(bodyYear + bodyMonth + bodyDate);
    }
    setEmpty(newEmpty);
    setBody(newBody);
  }, [date]);

  const onClickPrev = useCallback(() => {
    props.onChangeYm(
      String(new Date(date.getFullYear(), date.getMonth() - 1).getFullYear()) +
        String(
          new Date(date.getFullYear(), date.getMonth() - 1).getMonth() + 1 < 10
            ? "0" +
                String(
                  new Date(date.getFullYear(), date.getMonth() - 1).getMonth() +
                    1
                )
            : String(
                new Date(date.getFullYear(), date.getMonth() - 1).getMonth() + 1
              )
        )
    );
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  }, [date]);

  const onClickNext = useCallback(() => {
    props.onChangeYm(
      String(new Date(date.getFullYear(), date.getMonth() + 1).getFullYear()) +
        String(
          new Date(date.getFullYear(), date.getMonth() + 1).getMonth() + 1 < 10
            ? "0" +
                String(
                  new Date(date.getFullYear(), date.getMonth() + 1).getMonth() +
                    1
                )
            : String(
                new Date(date.getFullYear(), date.getMonth() + 1).getMonth() + 1
              )
        )
    );
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  }, [date]);

  const onClickDate = useCallback((v) => {
    props.onChangeDate(v);
    setSelectedDate(v);
  }, []);

  const emptyList = empty.map((v, i) => {
    return <div key={i}></div>;
  });

  const bodyList = body.map((v) => {
    const count = props.scheduleData.reduce(
      (c, e) => c + (v === String(e.ymd)),
      0
    );
    return (
      <div
        className={
          (v === todayYmd ? " today" : "") +
          (scheduleDate.includes(Number(v)) ? " includes" : "") +
          (v === selectedDate ? " selected" : "")
        }
        key={v}
        onClick={() => onClickDate(v)}
      >
        {v.substr(6, 2)}
        {count === 0 ? "" : ` (${count})`}
      </div>
    );
  });

  return (
    <Container>
      <Head>
        <div onClick={onClickPrev}>이전</div>
        <div>{date.getFullYear() + "년 " + (date.getMonth() + 1) + "월"}</div>
        <div onClick={onClickNext}>다음</div>
      </Head>
      <Days>
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </Days>
      <Dates>
        {emptyList}
        {bodyList}
      </Dates>
    </Container>
  );
};

export default Calendar;
