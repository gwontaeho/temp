import { useCallback, useState } from "react";
import axios from "axios";
import { Container, Logo, Section } from "./styles";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
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
    setType(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/login", {
          id,
          password,
          type,
        });
        console.log(response.data);
        return history.push("/");
      } catch (error) {
        console.log(error);
        console.log("abc");
      }
    },
    [id, password, type]
  );

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
            value="1"
            type="radio"
            name="checkType"
            defaultChecked
            onClick={changeType}
          />
          <label htmlFor="2">업체</label>
          <input
            id="2"
            value="2"
            type="radio"
            name="checkType"
            onClick={changeType}
          />
        </Section>
        <form onSubmit={onSubmit}>
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
          <button type="submit">로그인</button>
        </form>
        <Section>
          <Link to="/login">아이디 찾기</Link>
          <Link to="/login">비밀번호 찾기</Link>
          <Link to="/signup">회원가입</Link>
        </Section>
      </div>
    </Container>
  );
};

export default Login;
