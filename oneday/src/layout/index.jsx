import { Switch, Route, Redirect, Link } from "react-router-dom";
import loadable from "@loadable/component";
import { useCookies } from "react-cookie";
import { Container, Header, Logo, Sign, Search, Nav } from "./styles";
import { IoSearch } from "react-icons/io5";
import { useCallback } from "react";

const Main = loadable(() => import("../pages/main"));
const Info = loadable(() => import("../pages/info"));
const Category = loadable(() => import("../pages/category"));

const Layout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const onClickLogout = useCallback(() => {
    removeCookie("token");
  }, []);

  return (
    <Container>
      <Header>
        {/*로고 */}
        <Logo>
          <Link to="/">로고</Link>
        </Logo>
        {/* 로그인 섹션 */}
        <Sign>
          {cookies.token ? (
            <>
              <Link to="/checkbooking">예약확인</Link>
              <Link to="/info">회원정보</Link>
              <Link to="/" onClick={onClickLogout}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">회원가입</Link>
              <Link to="/login">로그인</Link>
            </>
          )}
        </Sign>
      </Header>
      {/* 검색창 */}
      <Search>
        <Nav>업체 또는 클래스를 검색하세요</Nav>
        <form>
          <input type="text" />
          <button>
            <IoSearch />
          </button>
        </form>
        <Nav>
          <Link to="/">플라워</Link>
          <Link to="/">베이킹</Link>
          <Link to="/">향수</Link>
          <Link to="/">드로잉</Link>
          <Link to="/">기타</Link>
          <Link to="/">전체</Link>
        </Nav>
      </Search>

      {/* 섹션 라우터 */}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/info" component={Info} />
      </Switch>
    </Container>
  );
};

export default Layout;
