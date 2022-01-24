import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosInstance from "../../axios";

import { Main, Header, Contents } from "./styles";

const Signup = () => {
  const navigate = useNavigate();

  const idRegExp = /^[a-z0-9]{4,12}$/;
  const passwordRegExp = /^[a-zA-Z0-9]{6,18}$/;
  const nicknameRegExp = /^[가-힣]{2,6}$/;

  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [idCheckResult, setIdCheckResult] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [nicknameCheckResult, setNicknameCheckResult] = useState(false);

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
    setIdCheck(false);
    setIdCheckResult(false);
  }, []);

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
    setNicknameCheck(false);
    setNicknameCheckResult(false);
  }, []);

  const checkId = useCallback(async () => {
    if (id === "admin") return window.alert("사용할 수 없는 아이디입니다");
    if (!idRegExp.test(id)) return;
    try {
      const response = await axiosInstance.get(`/api/user/id?id=${id}`);
      setIdCheck(true);
      if (response.status === 200 && response.data) setIdCheckResult(true);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const checkNickname = useCallback(async () => {
    if (!nicknameRegExp.test(nickname)) return;
    try {
      const response = await axiosInstance.get(
        `/api/user/nickname?nickname=${nickname}`
      );
      setNicknameCheck(true);
      if (response.status === 200 && response.data)
        setNicknameCheckResult(true);
    } catch (error) {
      console.log(error);
    }
  }, [nickname]);

  const postUser = useCallback(async () => {
    if (
      !idCheck ||
      !idCheckResult ||
      password !== passwordCheck ||
      !nicknameCheck ||
      !nicknameCheckResult
    )
      return window.alert("정보를 정확히 입력해주세요");

    try {
      const response = await axiosInstance.post("/api/user", {
        id,
        password,
        nickname,
      });
      if (response.status === 200) navigate("/");
    } catch (error) {
      console.log(error);
    }
  }, [
    id,
    idCheck,
    idCheckResult,
    password,
    passwordCheck,
    nickname,
    nicknameCheck,
    nicknameCheckResult,
  ]);

  return (
    <Main>
      <Header>회원가입</Header>
      <Contents>
        <TextField
          label="아이디"
          variant="outlined"
          error={!idRegExp.test(id) || !idCheck || !idCheckResult}
          helperText={
            !idRegExp.test(id)
              ? "4~12자의 소문자, 숫자만 사용 가능합니다"
              : !idCheck
              ? "중복확인을 해주세요"
              : !idCheckResult && "이미 사용중인 아이디입니다"
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={checkId} disabled={!idRegExp.test(id)}>
                  중복확인
                </Button>
              </InputAdornment>
            ),
          }}
          onChange={onChangeId}
        />
        <TextField
          label="비밀번호"
          variant="outlined"
          type="password"
          error={!passwordRegExp.test(password)}
          helperText={
            !passwordRegExp.test(password) &&
            "6~18자의 대 소문자, 숫자만 사용 가능합니다"
          }
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="비밀번호 확인"
          variant="outlined"
          type="password"
          error={password !== passwordCheck}
          helperText={
            password !== passwordCheck && "비밀번호가 일치하지 않습니다"
          }
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <TextField
          label="별명"
          variant="outlined"
          error={
            !nicknameRegExp.test(nickname) ||
            !nicknameCheck ||
            !nicknameCheckResult
          }
          helperText={
            !nicknameRegExp.test(nickname)
              ? "2~6자의 한글만 사용 가능합니다"
              : !nicknameCheck
              ? "중복확인을 해주세요"
              : !nicknameCheckResult && "이미 사용중인 별명입니다"
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={checkNickname}
                  disabled={!nicknameRegExp.test(nickname)}
                >
                  중복확인
                </Button>
              </InputAdornment>
            ),
          }}
          onChange={onChangeNickname}
        />
        <Button variant="contained" size="large" onClick={postUser}>
          회원가입
        </Button>
        <Button variant="text" size="large" onClick={() => navigate("/")}>
          취소
        </Button>
      </Contents>
    </Main>
  );
};

export default Signup;
