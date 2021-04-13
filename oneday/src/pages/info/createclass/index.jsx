import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

import { Container } from "./styles";
import axios from "axios";

const CreateClass = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // const hours = [
  //   "00",
  //   "01",
  //   "02",
  //   "03",
  //   "04",
  //   "05",
  //   "06",
  //   "07",
  //   "08",
  //   "09",
  //   "10",
  //   "11",
  //   "12",
  //   "13",
  //   "14",
  //   "15",
  //   "16",
  //   "17",
  //   "18",
  //   "19",
  //   "20",
  //   "21",
  //   "22",
  //   "23",
  //   "24",
  // ];

  // const minutes = ["00", "10", "20", "30", "40", "50"];

  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [hour, setHour] = useState("00");
  // const [minute, setMinute] = useState("00");
  // const [endHour, setEndHour] = useState("00");
  // const [endMinute, setEndMinute] = useState("00");
  // const [students, setStudents] = useState("1");
  // const [schedule, setSchedule] = useState({});

  const onChangeImg = useCallback((e) => {
    setImg(e.target.files[0]);
  }, []);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const onChangePrice = useCallback((e) => {
    setPrice(e.target.value);
  }, []);
  const onChangeTime = useCallback((e) => {
    setTime(e.target.value);
  }, []);
  // const onChangeDate = useCallback((e) => {
  //   setDate(e);
  // }, []);
  // const onChangeHour = useCallback((e) => {
  //   setHour(e.target.value);
  // }, []);
  // const onChangeMinute = useCallback((e) => {
  //   setMinute(e.target.value);
  // }, []);
  // const onChangeEndHour = useCallback((e) => {
  //   setEndHour(e.target.value);
  // }, []);
  // const onChangeEndMinute = useCallback((e) => {
  //   setEndMinute(e.target.value);
  // }, []);
  // const onChangeStudents = useCallback((e) => {
  //   setStudents(e.target.value);
  // }, []);

  const onSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("time", time);
    // formData.append("schedule", JSON.stringify(schedule));
    try {
      const response = await axios.post("/api/createclass", formData, {
        headers: {
          token: cookies.token,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [img, name, price, time]);

  // const onClickAdd = useCallback(() => {
  //   if (Number(hour + minute) >= Number(endHour + endMinute)) {
  //     console.log("nope");
  //   }

  //   const getYear = String(date.getFullYear());
  //   const getMonth =
  //     date.getMonth() + 1 < 10
  //       ? "0" + String(date.getMonth() + 1)
  //       : String(date.getMonth() + 1);
  //   const getDate =
  //     date.getDate() < 10
  //       ? "0" + String(date.getDate())
  //       : String(date.getDate());
  //   const data =
  //     getYear +
  //     getMonth +
  //     getDate +
  //     "/" +
  //     hour +
  //     minute +
  //     "/" +
  //     endHour +
  //     endMinute;

  //   let newSchedule = { ...schedule };
  //   newSchedule[data] = students;
  //   setSchedule(newSchedule);
  //   console.log(schedule);
  // }, [date, hour, minute, endHour, endMinute, students]);

  return (
    <Container>
      <label>
        클래스 대표사진
        {img ? (
          <img src={URL.createObjectURL(img)} style={{ width: "400px" }} />
        ) : null}
        <input type="file" onChange={onChangeImg} />
      </label>
      <label>
        클래스명
        <input type="text" value={name} onChange={onChangeName} />
      </label>
      <label>
        수강료ㅇ
        <input type="text" value={price} onChange={onChangePrice} />
      </label>
      <label>
        수강시간 약
        <input type="text" value={time} onChange={onChangeTime} /> 분
      </label>
      {/* 일정asdas
      <DatePicker
        selected={date}
        onChange={onChangeDate}
        dateFormat="yyyy년 MM월 dd일"
        locale={ko}
        minDate={new Date()}
      />
      <select onChange={onChangeHour}>
        {hours.map((v) => {
          return (
            <option key={v} value={v}>
              {v}
            </option>
          );
        })}
      </select>
      <select onChange={onChangeMinute}>
        {minutes.map((v) => {
          return (
            <option key={v} value={v}>
              {v}
            </option>
          );
        })}
      </select>
      <select onChange={onChangeEndHour}>
        {hours.map((v) => {
          return (
            <option key={v} value={v}>
              {v}
            </option>
          );
        })}
      </select>
      <select onChange={onChangeEndMinute}>
        {minutes.map((v) => {
          return (
            <option key={v} value={v}>
              {v}
            </option>
          );
        })}
      </select>
      <input type="text" value={students} onChange={onChangeStudents} /> */}
      {/* <button type="button" onClick={onClickAdd}>
        일정 추가
      </button> */}
      {/* {Object.keys(schedule)
        .sort((a, b) => {
          return a.replace(/\//gi, "") - b.replace(/\//gi, "");
        })
        .map((v) => {
          return (
            <li key={v + schedule[v]}>{v + "----------" + schedule[v]}</li>
          );
        })} */}
      <button type="button" onClick={onSubmit}>
        클래스 등록
      </button>
    </Container>
  );
};

export default CreateClass;
