import { useState, useCallback } from "react";

import { Container, Birth } from "./styles";

import { useCookies } from "react-cookie";
import { Redirect } from "react-router";

import axios from "axios";

const SignupUser = ({ history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const userReg = /^[a-zA-Z0-9]{6,12}$/;
  const passwordReg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{6,24}$/;
  const nameReg = /^[가-힣]*$/;

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("M");
  const [phone, setPhone] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/signup/user", {
          user,
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
    [user, password, passwordCheck, name, year, month, date, gender, phone]
  );

  const onChangeUser = useCallback((e) => {
    setUser(e.target.value);
    console.log(userReg.test(e.target.value));
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    console.log(passwordReg.test(e.target.value));
  }, []);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  }, []);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    console.log(nameReg.test(e.target.value));
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

  if (cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <label>
          아이디
          <input
            value={user}
            type="text"
            maxLength="12"
            autoFocus
            onChange={onChangeUser}
          />
        </label>
        <label>
          비밀번호
          <input
            value={password}
            type="password"
            maxLength="24"
            onChange={onChangePassword}
          />
        </label>
        <label>
          비밀번호 확인
          <input
            value={passwordCheck}
            type="password"
            maxLength="24"
            onChange={onChangePasswordCheck}
          />
        </label>
        <label>
          이름
          <input
            value={name}
            type="text"
            maxLength="12"
            onChange={onChangeName}
          />
        </label>
        <label>
          생년월일
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
          성별
          <select onChange={onChangeGender}>
            <option value="M">남자</option>
            <option value="F">여자</option>
            <option value="N">선택안함</option>
          </select>
        </label>
        <label>
          휴대전화
          <input
            value={phone}
            type="text"
            maxLength="11"
            onChange={onChangePhone}
          />
        </label>
        <button type="submit">가입하기</button>
      </form>
    </Container>
  );
};

export default SignupUser;
