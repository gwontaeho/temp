import React, { useState, useCallback } from "react";
import axios from "axios";
import profile from "../../../images/profile/profile.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Container, Img } from "./styles";

const User = (props) => {
  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const passwordRegExp = /^[a-zA-z0-9]{8,24}$/;
  const nameRegExp = /^[가-힣]{2,8}$/;
  const birthRegExp = /^[0-9]{8}$/;
  const phoneRegExp = /^[0-9]{1,11}$/;

  const [img, setImg] = useState();
  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("m");
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

    const formData = new FormData();
    formData.append("img", img);
    formData.append("id", id);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("birth", birth);
    formData.append("gender", gender);
    formData.append("phone", phone);

    try {
      const response = await axios.post("/api/auth/user/create", formData, {
        headers: { signuptype: 1, signupid: id },
      });
      if (response.status === 200) return props.history.replace("/");
    } catch (error) {
      console.log(error);
      return props.history.replace("/");
    }
  }, [img, id, idCheck, password, passwordCheck, name, birth, gender, phone]);

  const onClickCheckId = useCallback(async () => {
    if (!idRegExp.test(id)) return window.alert("아이디를 정확히 입력해주세요");

    try {
      const response = await axios.get(`/api/auth/overlap?id=${id}`);
      console.log(response);
      if (response.status === 200) setIdCheck(true);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <Container>
      <Img>
        <label htmlFor="input-file">
          <img src={img ? URL.createObjectURL(img) : profile} />
          <input
            id="input-file"
            type="file"
            accept="image/gif,image/jpeg,image/png"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </label>
      </Img>
      <div className="overlap">
        <Button variant="contained" onClick={onClickCheckId}>
          중복확인
        </Button>
      </div>
      <TextField
        label="아이디"
        variant="outlined"
        error={!idRegExp.test(id) ? true : !idCheck ? true : false}
        onChange={(e) => {
          setIdCheck(false);
          setId(e.target.value);
        }}
      />
      <TextField
        label="비밀번호"
        variant="outlined"
        type="password"
        error={!passwordRegExp.test(password) ? true : false}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="비밀번호 확인"
        variant="outlined"
        type="password"
        error={
          !passwordRegExp.test(passwordCheck)
            ? true
            : password !== passwordCheck
            ? true
            : false
        }
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <TextField
        label="이름"
        variant="outlined"
        error={!nameRegExp.test(name) ? true : false}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="gender">
        <Button
          variant={gender === "m" ? "outlined" : "text"}
          onClick={() => setGender("m")}
        >
          남자
        </Button>
        <Button
          variant={gender === "f" ? "outlined" : "text"}
          onClick={() => setGender("f")}
        >
          여자
        </Button>
      </div>
      <TextField
        label="생년월일"
        variant="outlined"
        error={!birthRegExp.test(birth) ? true : false}
        onChange={(e) => setBirth(e.target.value)}
      />
      <TextField
        label="연락처"
        variant="outlined"
        error={!phoneRegExp.test(phone) ? true : false}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button variant="contained" onClick={onClickSignUp}>
        회원가입
      </Button>
      <Button variant="outlined" onClick={() => props.history.replace("/")}>
        취소
      </Button>
    </Container>
  );
};

export default User;
