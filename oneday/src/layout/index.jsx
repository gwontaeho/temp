import { Switch, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";
import { useCookies } from "react-cookie";
import { Container, Header, Logo, Sign, Search } from "./styles";
import { useCallback } from "react";
import { IoSearch } from "react-icons/io5";

const Main = loadable(() => import("../pages/main"));
const Info = loadable(() => import("../pages/info"));
const Category = loadable(() => import("../pages/category"));
const Product = loadable(() => import("../pages/product"));

const Layout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const onClickLogout = useCallback(() => {
    console.log(cookies);
    if (cookies.token) {
      removeCookie("token", { path: "/" });
    }
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
              <Link to="/info">내 정보</Link>
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
      <Search>
        <div>
          <Link to="/">플라워</Link>
          <Link to="/">베이킹</Link>
          <Link to="/">향수</Link>
          <Link to="/">드로잉</Link>
          <Link to="/">기타</Link>
          <Link to="/category/all">전체</Link>
        </div>
        <form>
          <input type="text" />
          <button>
            <IoSearch />
          </button>
        </form>
      </Search>
      {/* 섹션 라우터 */}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/info" component={Info} />
        <Route path="/category/:category" component={Category} />
        <Route path="/product/:product" component={Product} />
      </Switch>
    </Container>
  );
};

export default Layout;
