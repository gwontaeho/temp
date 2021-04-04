import { useCallback, useState } from "react";
import axios from "axios";
import { Container, Logo, Form, LoginBtn, Find, FindLink } from "./styles";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";

const Login = ({ history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUser = useCallback((e) => {
    setUser(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/login", {
          user,
          password,
        });
        console.log(response.data);
        return history.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    [user, password]
  );

  if (cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Logo>로고</Logo>
      <div>
        <Form onSubmit={onSubmit}>
          <input
            value={user}
            type="text"
            placeholder="아이디"
            maxLength="12"
            autoFocus
            onChange={onChangeUser}
          />
          <input
            value={password}
            type="password"
            placeholder="비밀번호"
            maxLength="24"
            onChange={onChangePassword}
          />
          <LoginBtn type="submit">로그인</LoginBtn>
        </Form>
        <Find>
          <FindLink to="/login">아이디 찾기</FindLink>
          <FindLink to="/login">비밀번호 찾기</FindLink>
          <FindLink to="/signup">회원가입</FindLink>
        </Find>
      </div>
    </Container>
  );
};

export default Login;
