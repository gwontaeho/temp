import React, { useCallback, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Container, Logo, Inputs, Section } from "./styles";

const Login = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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
      await axios.post("/api/auth/login", {
        id,
        password,
        type,
      });
      return props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [id, password, type]);

  if (cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Logo>로고</Logo>
      <div>
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
      </div>
    </Container>
  );
};

export default Login;
