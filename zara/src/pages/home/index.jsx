import { useCallback, useEffect, useRef, useState } from "react";
import first from "../../images/home/first.jpg";
import man from "../../images/home/man.jpg";
import woman from "../../images/home/woman.jpg";
import kids from "../../images/home/kids.jpg";
import {
  Container,
  Slider,
  Top,
  TopSlider,
  PrevButton,
  NextButton,
  Bottom,
  Buttons,
} from "./styles";

import Footer from "../../components/footer_home";

const Home = () => {
  const sliderRef = useRef();
  const topSliderRef = useRef();

  const screenTitle = ["BEAUTY", "MAN", "WOMAN", "KIDS"];

  const [screen, setScreen] = useState(0);
  const [topScreen, setTopScreen] = useState(0);

  useEffect(() => {
    window.addEventListener("wheel", wheel);
    return () => {
      window.removeEventListener("wheel", wheel);
    };
  }, []);

  useEffect(() => {
    sliderRef.current.style.transform = `translateY(-${(100 * screen) / 2}%)`;
  }, [screen]);

  useEffect(() => {
    topSliderRef.current.style.transform = `translateX(-${
      (100 * topScreen) / 4
    }%)`;
  }, [topScreen]);

  const wheel = useCallback((e) => {
    if (e.wheelDelta > 0) setScreen(0);
    else setScreen(1);
  }, []);

  const onClickPrev = useCallback(() => {
    if (topScreen === 0) return;
    setTopScreen(topScreen - 1);
  }, [topScreen]);

  const onClickNext = useCallback(() => {
    if (topScreen === 3) return;
    setTopScreen(topScreen + 1);
  }, [topScreen]);

  return (
    <Container>
      <Slider ref={sliderRef}>
        <Top>
          <TopSlider ref={topSliderRef}>
            <div>
              <img src={first} alt="first" />
            </div>
            <div>
              <img src={man} alt="man" />
            </div>
            <div>
              <img src={woman} alt="woman" />
            </div>
            <div>
              <img src={kids} alt="kids" />
            </div>
          </TopSlider>
          {topScreen !== 0 && (
            <PrevButton onClick={onClickPrev}>
              <div className="icon">
                <svg viewBox="0 0 14 25">
                  <path d="M 12.647 12.661 L 0.824 0.838 l 0.354 -0.354 l 12.176 12.177 L 1.178 24.838 l -0.354 -0.354 l 11.823 -11.823 Z" />
                </svg>
              </div>
              <div>{screenTitle[topScreen - 1]}</div>
            </PrevButton>
          )}
          {topScreen !== 3 && (
            <NextButton onClick={onClickNext}>
              <div>{screenTitle[topScreen + 1]}</div>
              <div className="icon">
                <svg viewBox="0 0 14 25">
                  <path d="M 12.647 12.661 L 0.824 0.838 l 0.354 -0.354 l 12.176 12.177 L 1.178 24.838 l -0.354 -0.354 l 11.823 -11.823 Z" />
                </svg>
              </div>
            </NextButton>
          )}
        </Top>
        <Bottom>
          <Footer />
        </Bottom>
      </Slider>
      <Buttons>
        <div>
          <svg viewBox="0 0 8 8">
            {screen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 4 7 a 3 3 0 1 0 0 -6 a 3 3 0 0 0 0 6 Z m 0 1 a 4 4 0 1 0 0 -8 a 4 4 0 0 0 0 8 Z"
              />
            ) : (
              <circle cx="4" cy="4" r="4" />
            )}
          </svg>
        </div>
        <div>
          <svg viewBox="0 0 8 8">
            {screen ? (
              <circle cx="4" cy="4" r="4" />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 4 7 a 3 3 0 1 0 0 -6 a 3 3 0 0 0 0 6 Z m 0 1 a 4 4 0 1 0 0 -8 a 4 4 0 0 0 0 8 Z"
              />
            )}
          </svg>
        </div>
      </Buttons>
    </Container>
  );
};

export default Home;
