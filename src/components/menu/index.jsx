import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { closeMenu } from "../../redux/menu/actions";
import { setDark, setLight } from "../../redux/mode/actions";
import kakao from "../../images/home/111.png";
import news from "../../images/home/222.png";
import tech from "../../images/home/333.png";
import appointment from "../../images/home/444.png";
import { Container, Inner, Header, Logo, Button, Nav, Footer } from "./styles";

const Menu = () => {
  const dispatch = useDispatch();

  const menu = useSelector((state) => state.menu);
  const mode = useSelector((state) => state.mode);
  const containerRef = useRef();

  useEffect(() => {
    if (menu.open) {
      containerRef.current.classList.add("open");
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    } else {
      containerRef.current.classList.remove("open");
      document.body.style.overflowY = "scroll";
      document.body.style.height = "auto";
    }
  }, [menu]);

  useEffect(() => {
    if (mode.dark) containerRef.current.classList.add("dark");
    else containerRef.current.classList.remove("dark");
  }, [mode]);

  const onClickCloseMenu = useCallback(() => {
    dispatch(closeMenu());
  }, []);

  const setMode = useCallback(() => {
    if (mode.dark) dispatch(setLight());
    else dispatch(setDark());
  }, [mode]);

  return (
    <Container ref={containerRef}>
      <Inner>
        <Header>
          <Logo>kakao</Logo>
          <Button onClick={onClickCloseMenu}>
            <svg viewBox="0 0 28 28">
              <g fill="none" strokeLinecap="square" fillRule="evenodd">
                <g strokeWidth={1.6}>
                  <path
                    transform="translate(-547, -167) translate(187, 145) translate(360, 22) translate(6, 5)"
                    d="M 0 0.5 L 16.5 17.5"
                  />
                  <path
                    transform="translate(-547, -167) translate(187, 145) translate(360, 22) translate(6, 5) matrix(-1, 0, 0, 1, 17, 0)"
                    d="M 0 0.5 L 16.5 17.5"
                  />
                </g>
              </g>
            </svg>
          </Button>
        </Header>
        <Nav>
          <ul>
            <li>
              <img src={kakao} alt={kakao} />
              <div>카카오</div>
            </li>
            <li>
              <img src={news} alt={news} />
              <div>뉴스</div>
            </li>
            <li>
              <img src={tech} alt={tech} />
              <div>기술과 서비스</div>
            </li>
            <li>
              <img src={appointment} alt={appointment} />
              <div>약속과 책임</div>
            </li>
          </ul>
        </Nav>
        <Footer>
          <div>
            <ul>
              <li>투자정보</li>
              <li>인재영입</li>
              <li>고객센터</li>
            </ul>
          </div>
          <div className="mode" onClick={setMode}>
            {mode.dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                <g fill="none" fillRule="evenodd">
                  <path
                    strokeWidth="1.6"
                    transform="translate(-1423, -168) translate(79.5, 145) translate(1248, 24) translate(96, 0)"
                    d="M 11.888 6.22 c 1.586 0 3.023 0.643 4.063 1.682 c 1.04 1.04 1.682 2.476 1.682 4.063 c 0 1.587 -0.643 3.023 -1.682 4.063 c -1.04 1.04 -2.477 1.682 -4.063 1.682 c -1.587 0 -3.023 -0.643 -4.063 -1.682 c -1.04 -1.04 -1.682 -2.476 -1.682 -4.063 c 0 -1.587 0.643 -3.023 1.682 -4.063 c 1.04 -1.04 2.476 -1.683 4.063 -1.683 Z"
                  />
                  <path
                    strokeWidth="1.6"
                    transform="translate(-1423, -168) translate(79.5, 145) translate(1248, 24) translate(96, 0)"
                    d="M 18.973 4.88 l -1.154 1.154 l 1.154 -1.154 l 1.154 -1.154 l -1.154 1.154 Z M 4.608 19.245 L 3.453 20.4 l 1.155 -1.155 l 1.154 -1.154 l -1.154 1.154 Z M 21.948 12.063 L 20.315 12.063 L 21.948 12.063 L 23.58 12.063 Z M 1.632 12.063 L 0 12.063 L 1.632 12.063 L 3.265 12.063 Z M 18.973 19.245 l -1.154 -1.154 l 1.154 1.154 l 1.154 1.155 l -1.154 -1.155 Z M 4.608 4.88 L 3.453 3.726 L 4.608 4.88 l 1.154 1.154 L 4.608 4.88 Z M 11.824 1.905 L 11.824 3.538 L 11.824 1.905 L 11.824 0.273 Z M 11.824 22.22 L 11.824 23.853 L 11.824 22.22 L 11.824 20.588 Z"
                  />
                </g>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd" strokeLinejoin="round">
                  <g strokeWidth="1.5">
                    <path
                      transform="translate(-1344, -24) translate(1248, 24) translate(96, 0) translate(4, 3)"
                      d="M 16.086 13.417 c -5.013 0 -9.076 -4.04 -9.076 -9.023 c 0 -1.596 0.42 -3.093 1.152 -4.394 C 3.58 0.456 0 4.3 0 8.977 C 0 13.961 4.064 18 9.076 18 c 3.407 0 6.372 -1.868 7.924 -4.628 c -0.3 0.03 -0.605 0.045 -0.914 0.045 Z"
                    />
                  </g>
                </g>
              </svg>
            )}
          </div>
        </Footer>
      </Inner>
    </Container>
  );
};

export default Menu;
