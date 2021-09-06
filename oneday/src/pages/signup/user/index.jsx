import React, { useState, useCallback } from "react";

import { Container, Birth, Buttons } from "./styles";

import { useCookies } from "react-cookie";
import { Redirect } from "react-router";

import axios from "axios";

const User = ({ history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("M");
  const [phone, setPhone] = useState("");

  const onClickSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/signup/user", {
          id,
          password,
          name,
          birth: year + month + date,
          gender,
          phone,
        });
        console.log(response.data);
        return history.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    [id, password, passwordCheck, name, year, month, date, gender, phone]
  );

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  }, []);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onChangeYear = useCallback((e) => {
    setYear(e.target.value);
  }, []);

  const onChangeMonth = useCallback((e) => {
    setMonth(e.target.value);
  }, []);

  const onChangeDate = useCallback((e) => {
    setDate(e.target.value);
  }, []);

  const onChangeGender = useCallback((e) => {
    setGender(e.target.value);
  }, []);

  const onChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const onClickCancel = useCallback(() => {
    return history.push("/");
  }, []);

  if (cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <label>
        <div>아이디</div>
        <input
          value={id}
          type="text"
          maxLength="12"
          autoFocus
          onChange={onChangeId}
        />
      </label>
      <label>
        <div>비밀번호</div>
        <input
          value={password}
          type="password"
          maxLength="24"
          onChange={onChangePassword}
        />
      </label>
      <label>
        <div>비밀번호 확인</div>
        <input
          value={passwordCheck}
          type="password"
          maxLength="24"
          onChange={onChangePasswordCheck}
        />
      </label>
      <label>
        <div>이름</div>
        <input
          value={name}
          type="text"
          maxLength="12"
          onChange={onChangeName}
        />
      </label>
      <label>
        <div>생년월일</div>
        <Birth>
          <input
            value={year}
            type="text"
            placeholder="년(4자리)"
            maxLength="4"
            onChange={onChangeYear}
          />
          <input
            value={month}
            type="text"
            placeholder="월"
            maxLength="2"
            onChange={onChangeMonth}
          />
          <input
            value={date}
            type="text"
            placeholder="일"
            maxLength="2"
            onChange={onChangeDate}
          />
        </Birth>
      </label>
      <label>
        <div>성별</div>
        <select onChange={onChangeGender}>
          <option value="M">남자</option>
          <option value="F">여자</option>
          <option value="N">선택안함</option>
        </select>
      </label>
      <label>
        <div>휴대전화</div>
        <input
          value={phone}
          type="text"
          maxLength="11"
          onChange={onChangePhone}
        />
      </label>
      <Buttons>
        <div onClick={onClickSignUp}>가입하기</div>
        <div onClick={onClickCancel}>취소</div>
      </Buttons>
    </Container>
  );
};

export default User;
