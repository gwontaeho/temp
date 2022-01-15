import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { login } from "../../features/auth";
import "./index.css";

const Login = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/user?id=${id}&password=${password}`
      );
      if (response.status === 200)
        return dispatch(login({ id, token: response.data }));
    } catch (error) {
      if (error.response.status === 400)
        return window.alert("아이디 또는 비밀번호를 확인해주세요");
    }
  }, [id, password]);

  return (
    <div className="login-container">
      <div className="login-header">로그인</div>
      <div className="login-input">
        <TextField
          label="아이디"
          variant="outlined"
          onChange={(e) => setId(e.target.value)}
        />
        <TextField
          label="비밀번호"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" size="large" onClick={getUser}>
          로그인
        </Button>
      </div>
    </div>
  );
};

export default Login;
