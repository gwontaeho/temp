import React, { useCallback, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../features/auth";

import { Container, Title, Inner, Inputs, Buttons } from "./styles";

const Login = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(1);

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onClickLogin = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/auth?id=${id}&password=${password}&type=${type}`
      );
      console.log(response.data);
      dispatch(logIn({ token: response.data, type }));
      if (response.status === 200) return props.history.replace("/");
    } catch (error) {
      console.log(error);
    }
  }, [id, password, type]);

  if (auth.type !== 0) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Title>로그인</Title>
      <Inner>
        <Buttons>
          <Button
            variant={type === 1 ? "contained" : "outlined"}
            onClick={() => setType(1)}
          >
            일반
          </Button>
          <Button
            variant={type === 2 ? "contained" : "outlined"}
            onClick={() => setType(2)}
          >
            판매자
          </Button>
        </Buttons>
        <Inputs>
          <TextField
            id="outlined-basic"
            label="아이디"
            type="text"
            variant="outlined"
            onChange={onChangeId}
          />
          <TextField
            id="outlined-basic"
            label="비밀번호"
            variant="outlined"
            type="password"
            onChange={onChangePassword}
          />
        </Inputs>
        <Button variant="contained" onClick={onClickLogin}>
          로그인
        </Button>
        <Link to="/signup">회원가입</Link>
      </Inner>
    </Container>
  );
};

export default Login;
