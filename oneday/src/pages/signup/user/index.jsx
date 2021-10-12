import React, { useState, useCallback } from "react";
import axios from "axios";

import { Container, Buttons } from "./styles";

const User = (props) => {
  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const passwordRegExp = /^[a-zA-z0-9]{8,24}$/;
  const nameRegExp = /^[가-힣]{2,8}$/;
  const birthRegExp = /^[0-9]{8}$/;
  const phoneRegExp = /^[0-9]{1,11}$/;

  const idRef = React.createRef();
  const passwordRef = React.createRef();
  const passwordCheckRef = React.createRef();
  const nameRef = React.createRef();
  const birthRef = React.createRef();
  const phoneRef = React.createRef();

  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("M");
  const [phone, setPhone] = useState("");

  const onClickSignUp = useCallback(async () => {
    if (!idRegExp.test(id)) return window.alert("아이디를 정확히 입력해주세요");
    if (!idCheck) return window.alert("아이디 중복확인을 해주세요");
    if (!passwordRegExp.test(password))
      return window.alert("비밀번호를 정확히 입력해주세요");
    if (!passwordRegExp.test(passwordCheck))
      return window.alert("비밀번호를 정확히 입력해주세요");
    if (password !== passwordCheck)
      return window.alert("비밀번호를 정확히 입력해주세요");
    if (!nameRegExp.test(name))
      return window.alert("이름을 정확히 입력해주세요");
    if (!birthRegExp.test(birth))
      return window.alert("생일을 정확히 입력해주세요");
    if (!phoneRegExp.test(phone))
      return window.alert("휴대전화를 정확히 입력해주세요");

    try {
      await axios.post("/api/auth/user/create", {
        id,
        password,
        name,
        birth,
        gender,
        phone,
      });
      return props.history.replace("/");
    } catch (error) {
      console.log(error);
    }
  }, [id, idCheck, password, passwordCheck, name, birth, gender, phone]);

  const validation = useCallback((v) => {
    v.current.style.display = "block";
  }, []);

  const onClickCheckId = useCallback(async () => {
    if (!idRegExp.test(id)) return window.alert("아이디를 정확히 입력해주세요");

    try {
      const response = await axios.post("/api/auth/overlap", {
        id,
      });
      console.log(response);
      if (response.status === 200) setIdCheck(true);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const onChangeId = useCallback(
    (e) => {
      validation(idRef);
      setIdCheck(false);
      setId(e.target.value);
    },
    [idRef]
  );

  const onChangePassword = useCallback(
    (e) => {
      validation(passwordRef);
      setPassword(e.target.value);
    },
    [passwordRef]
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      validation(passwordCheckRef);
      setPasswordCheck(e.target.value);
    },
    [passwordCheckRef]
  );

  const onChangeName = useCallback(
    (e) => {
      validation(nameRef);
      setName(e.target.value);
    },
    [nameRef]
  );

  const onChangeBirth = useCallback(
    (e) => {
      validation(birthRef);
      setBirth(e.target.value);
    },
    [birthRef]
  );

  const onChangeGender = useCallback((e) => {
    setGender(e.target.value);
  }, []);

  const onChangePhone = useCallback(
    (e) => {
      validation(phoneRef);
      setPhone(e.target.value);
    },
    [phoneRef]
  );

  const onClickCancel = useCallback(() => {
    return props.history.push("/");
  }, []);

  return (
    <Container>
      <label>
        <div className="title">
          <div>아이디</div>
          <div className="idCheck" onClick={onClickCheckId}>
            중복확인
          </div>
        </div>
        <div className="contents">
          <input
            value={id}
            type="text"
            maxLength="12"
            autoFocus
            onChange={onChangeId}
          />
          <div ref={idRef}>{idRegExp.test(id) && idCheck ? "o" : "x"}</div>
        </div>
      </label>

      <label>
        <div className="title">비밀번호</div>
        <div className="contents">
          <input
            value={password}
            type="password"
            maxLength="24"
            onChange={onChangePassword}
          />
          <div ref={passwordRef}>
            {passwordRegExp.test(password) ? "o" : "x"}
          </div>
        </div>
      </label>

      <label>
        <div className="title">비밀번호 확인</div>
        <div className="contents">
          <input
            value={passwordCheck}
            type="password"
            maxLength="24"
            onChange={onChangePasswordCheck}
          />
          <div ref={passwordCheckRef}>
            {passwordRegExp.test(passwordCheck) && password === passwordCheck
              ? "o"
              : "x"}
          </div>
        </div>
      </label>

      <label>
        <div className="title">이름</div>
        <div className="contents">
          <input
            value={name}
            type="text"
            maxLength="12"
            onChange={onChangeName}
          />
          <div ref={nameRef}>{nameRegExp.test(name) ? "o" : "x"}</div>
        </div>
      </label>

      <label>
        <div className="title">생년월일</div>
        <div className="contents">
          <input
            value={birth}
            type="text"
            placeholder="생년월일 (8자리)"
            maxLength="8"
            onChange={onChangeBirth}
          />
          <div ref={birthRef}>{birthRegExp.test(birth) ? "o" : "x"}</div>
        </div>
      </label>

      <label>
        <div className="title">성별</div>
        <select onChange={onChangeGender}>
          <option value="M">남자</option>
          <option value="F">여자</option>
          <option value="N">선택안함</option>
        </select>
      </label>

      <label>
        <div className="title">휴대전화</div>
        <div className="contents">
          <input
            value={phone}
            type="text"
            maxLength="11"
            onChange={onChangePhone}
          />
          <div ref={phoneRef}>{phoneRegExp.test(phone) ? "o" : "x"}</div>
        </div>
      </label>

      <Buttons>
        <div onClick={onClickSignUp}>가입하기</div>
        <div onClick={onClickCancel}>취소</div>
      </Buttons>
    </Container>
  );
};

export default User;
