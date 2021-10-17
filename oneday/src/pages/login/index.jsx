import React, { useCallback, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../features/auth";

import { Container, Inputs, Section } from "./styles";

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

  const changeType = useCallback((e) => {
    setType(Number(e.target.value));
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
      <Section>
        <label htmlFor="1">일반</label>
        <input
          id="1"
          value={1}
          type="radio"
          name="checkType"
          defaultChecked
          onClick={changeType}
        />
        <label htmlFor="2">업체</label>
        <input
          id="2"
          value={2}
          type="radio"
          name="checkType"
          onClick={changeType}
        />
      </Section>
      <Inputs>
        <input
          value={id}
          type="text"
          placeholder="아이디"
          maxLength="12"
          autoFocus
          onChange={onChangeId}
        />
        <input
          value={password}
          type="password"
          placeholder="비밀번호"
          maxLength="24"
          onChange={onChangePassword}
        />
        <div className="button" onClick={onClickLogin}>
          로그인
        </div>
      </Inputs>
      <Section>
        <Link to="/signup">회원가입</Link>
      </Section>
    </Container>
  );
};

export default Login;
