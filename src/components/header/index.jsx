import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setDark, setLight } from "../../redux/mode/actions";
import { openMenu } from "../../redux/menu/actions";
import { Container, Inner, Logo, Nav, Buttons, Search } from "./styles";

const Header = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const containerRef = useRef();
  const searchRef = useRef();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY) setScrolled(true);
      else setScrolled(false);
    });
  }, []);

  useEffect(() => {
    if (scrolled) {
      containerRef.current.classList.add("scrolled");
    } else {
      containerRef.current.classList.remove("scrolled");
    }
  }, [scrolled]);

  useEffect(() => {
    const home = document.getElementsByClassName("home")[0];
    if (open) {
      containerRef.current.classList.add("open");
      searchRef.current.classList.add("open");
      document.body.style.position = "fixed";
      home.style.opacity = 0.5;
    } else {
      containerRef.current.classList.remove("open");
      searchRef.current.classList.remove("open");
      document.body.style.position = "static";
      home.style.opacity = 1;
    }
  }, [open]);

  useEffect(() => {
    if (mode.dark) containerRef.current.classList.add("dark");
    else containerRef.current.classList.remove("dark");
  }, [mode]);

  const openSearch = useCallback(() => {
    if (open) setOpen(false);
    else setOpen(true);
  }, [open]);

  const onClickOpenMenu = useCallback(() => {
    dispatch(openMenu());
  }, []);

  const setMode = useCallback(() => {
    if (mode.dark) dispatch(setLight());
    else dispatch(setDark());
  }, [mode]);

  return (
    <Container ref={containerRef}>
      <Inner className="inner">
        <Logo>kakao</Logo>
        <Nav>
          <li>카카오</li>
          <li>뉴스</li>
          <li>기술과 서비스</li>
          <li>약속과 책임</li>
        </Nav>
        <Buttons className="buttons">
          <div onClick={openSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
              <g fill="none" fillRule="evenodd">
                <g strokeWidth="1.6">
                  <g transform="translate(-308 -16) translate(312 20)">
                    <circle cx="8.944" cy="8.944" r="8.944" />
                    <path d="M 14.987 14.987 L 21.017 21.017" />
                  </g>
                </g>
              </g>
            </svg>
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

          <div className="hamburger" onClick={onClickOpenMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
              <g fill="none" fillRule="evenodd">
                <path
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  transform="translate(-360, -16) translate(364, 19)"
                  d="M 19.96 8.88 V 6.578 c 0 -3.842 -4.4 -6.272 -9.827 -6.272 S 0.306 2.736 0.306 6.578 V 8.88 H 19.96 Z"
                />
                <path
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  transform="translate(-360, -16) translate(364, 19)"
                  d="M 0.306 12.414 c 1.228 0 1.228 1.18 2.456 1.18 s 1.228 -1.18 2.456 -1.18 s 1.228 1.18 2.455 1.18 c 1.229 0 1.229 -1.18 2.457 -1.18 c 1.228 0 1.228 1.18 2.455 1.18 c 1.229 0 1.229 -1.18 2.457 -1.18 c 1.23 0 1.23 1.18 2.46 1.18 c 1.229 0 1.229 -1.18 2.458 -1.18"
                />
                <g strokeLinejoin="round" strokeWidth="1.6">
                  <path
                    transform="translate(-360, -16) translate(364, 19) translate(0, 17.192)"
                    d="M 10.133 0.25 H 0.306 v 1.966 c 0 1.087 0.881 1.968 1.967 1.968 h 15.72 c 1.086 0 1.967 -0.881 1.967 -1.968 V 0.25 h -9.827"
                  />
                </g>
                <path
                  d="M5.6 5.8c0 .442-.358.8-.8.8-.442 0-.8-.358-.8-.8 0-.442.358-.8.8-.8.442 0 .8.358.8.8M11.6 5.8c0 .442-.358.8-.8.8-.442 0-.8-.358-.8-.8 0-.442.358-.8.8-.8.442 0 .8.358.8.8M8.6 3.8c0 .442-.358.8-.8.8-.442 0-.8-.358-.8-.8 0-.442.358-.8.8-.8.442 0 .8.358.8.8M13.6 3.8c0 .442-.358.8-.8.8-.442 0-.8-.358-.8-.8 0-.442.358-.8.8-.8.442 0 .8.358.8.8M16.6 5.8c0 .442-.358.8-.8.8-.442 0-.8-.358-.8-.8 0-.442.358-.8.8-.8.442 0 .8.358.8.8"
                  transform="translate(-360 -16) translate(364 19)"
                />
              </g>
            </svg>
          </div>
        </Buttons>
      </Inner>
      <Search ref={searchRef}>
        <div className="input">
          <input placeholder="무엇이 궁금하신가요?" />
        </div>
        <div className="tag">
          <a>#NFT</a>
          <a>#디지털 자격증</a>
          <a>#카카오 인증서</a>
          <a>#톡 지갑</a>
        </div>
      </Search>
    </Container>
  );
};

export default Header;
