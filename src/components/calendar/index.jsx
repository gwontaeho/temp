import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "../../redux/date/actions";

import { Container, Header, Days, Dates } from "./styles";

const days = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);

  const [firstDate, setFirstDate] = useState(
    new Date(date.today.getFullYear(), date.today.getMonth(), 1)
  );
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const lastDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth() + 1,
      0
    );
    const newDates = [];
    for (let i = 0; i < firstDate.getDay(); i++) {
      newDates[i] = null;
    }
    for (let i = 0; i < lastDate.getDate(); i++) {
      newDates[i + firstDate.getDay()] = new Date(
        lastDate.getFullYear(),
        lastDate.getMonth(),
        i + 1
      );
    }
    setDates(newDates);
  }, [firstDate]);

  const onClickPrev = useCallback(() => {
    setFirstDate(new Date(firstDate.getFullYear(), firstDate.getMonth() - 1));
  }, [firstDate]);

  const onClickNext = useCallback(() => {
    setFirstDate(new Date(firstDate.getFullYear(), firstDate.getMonth() + 1));
  }, [firstDate]);

  const onClickDate = useCallback((v) => {
    dispatch(setDate(v));
  }, []);

  const goToday = useCallback(() => {
    setFirstDate(new Date(date.today.getFullYear(), date.today.getMonth(), 1));
    dispatch(setDate(date.today));
  }, []);

  const dayList = days.map((day) => {
    const className =
      day === "토" ? "saturday" : day === "일" ? "sunday" : undefined;
    return (
      <div key={day} className={className}>
        {day}
      </div>
    );
  });

  const dateList = dates.map((v, i) => {
    let className = "";
    if (v) {
      const record = window.localStorage.getItem(v.toLocaleDateString());
      if (date.today.getTime() === v.getTime()) className = "today";
      if (date.current.getTime() === v.getTime()) className += " current";
      if (record) className += " isIn";
    }

    return (
      <div
        className={className || undefined}
        key={i}
        onClick={v && (() => onClickDate(v))}
      >
        {v && v.getDate()}
      </div>
    );
  });

  return (
    <Container>
      <Header>
        <div className="header-button" onClick={onClickPrev}>
          이전
        </div>
        <div
          className="header-date"
          onClick={goToday}
        >{`${firstDate.getFullYear()}년 ${firstDate.getMonth() + 1}월`}</div>
        <div className="header-button" onClick={onClickNext}>
          다음
        </div>
      </Header>
      <Days>{dayList}</Days>
      <Dates>{dateList}</Dates>
    </Container>
  );
};

export default Calendar;
