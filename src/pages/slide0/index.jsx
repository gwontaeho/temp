import { useRef, useEffect, useState, useCallback } from "react";
import anime from "animejs/lib/anime.es.js";
import { Main, Slides, Slide, Frame, Nav } from "./styles";
import { data } from "./data";

const Slide0 = () => {
  const mainRef = useRef();
  const frameRef = useRef();
  const slideRef = useRef([]);
  const imgRef = useRef([]);
  const [mainRect, setMainRect] = useState({ width: 0, height: 0 });
  const [paths, setPaths] = useState({ initial: "", final: "" });
  const [prev, setPrev] = useState(0);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(0);

  const settings = {
    slides: {
      duration: 600,
      easing: "easeOutQuint",
    },
    frame: {
      duration: 300,
      easing: { in: "easeOutQuint", out: "easeOutQuad" },
    },
  };

  useEffect(() => {
    if (prev !== current) animate();
  }, [current]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resize = useCallback(() => {
    const mainWidth = mainRef.current.getBoundingClientRect().width;
    const mainHeight = mainRef.current.getBoundingClientRect().height;
    const frameSize = mainWidth / 12;

    setMainRect({
      width: mainWidth,
      height: mainHeight,
    });

    setPaths({
      initial: `M 0,0 0,${mainHeight} ${mainWidth},${mainHeight} ${mainWidth},0 0,0 Z M 0,0 ${mainWidth},0 ${mainWidth},${mainHeight} 0,${mainHeight} Z`,
      final: `M 0,0 0,${mainHeight} ${mainWidth},${mainHeight} ${mainWidth},0 0,0 Z M ${frameSize},${frameSize} ${
        mainWidth - frameSize
      },${frameSize} ${mainWidth - frameSize},${
        mainHeight - frameSize
      } ${frameSize},${mainHeight - frameSize} Z`,
    });
  }, []);

  const animate = useCallback(() => {
    const frameIn = anime({
      targets: frameRef.current,
      duration: settings.frame.duration,
      easing: settings.frame.easing.in,
      d: paths.final,
    });

    const slide = () => {
      anime({
        targets: slideRef.current[prev],
        duration: settings.slides.duration,
        easing: settings.slides.easing,
        translateX: direction ? -1 * mainRect.width : mainRect.width,
        complete: () => {
          slideRef.current[prev].style.opacity = 0;
        },
      }).finished.then(frameOut);

      anime({
        targets: slideRef.current[current],
        duration: settings.slides.duration,
        easing: settings.slides.easing,
        translateX: [direction ? mainRect.width : -1 * mainRect.width, 0],
        begin: () => {
          slideRef.current[current].style.opacity = 1;
        },
      });

      anime({
        targets: imgRef.current[current],
        duration: settings.slides.duration * 4,
        easing: settings.slides.easing,
        translateX: [direction ? 200 : -200, 0],
      });
    };

    const frameOut = () => {
      anime({
        targets: frameRef.current,
        duration: settings.frame.duration,
        delay: 150,
        easing: settings.frame.easing.out,
        d: paths.initial,
        complete: () => {
          setIsAnimating(0);
        },
      });
    };

    frameIn.finished.then(slide);
  }, [mainRect, prev, current, direction, paths]);

  const slideToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(1);
    setDirection(0);
    setPrev(current);
    setCurrent((prevState) => {
      if (prevState === 0) return slideRef.current.length - 1;
      return prevState - 1;
    });
  }, [isAnimating, current]);

  const slideToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(1);
    setDirection(1);
    setPrev(current);
    setCurrent((prevState) => {
      if (prevState === slideRef.current.length - 1) return 0;
      return prevState + 1;
    });
  }, [isAnimating, current]);

  return (
    <Main ref={mainRef}>
      <Slides>
        {data.map((data, i) => (
          <Slide
            key={data.id}
            ref={(ref) => (slideRef.current[i] = ref)}
            style={{ opacity: i === 0 && 1 }}
          >
            <div
              ref={(ref) => (imgRef.current[i] = ref)}
              style={{ backgroundImage: `url(${data.img})` }}
            />
          </Slide>
        ))}
      </Slides>
      <Frame viewBox={`0 0 ${mainRect.width} ${mainRect.height}`}>
        <path ref={frameRef} fill="#f1f1f1" d={paths.initial} />
      </Frame>
      <Nav>
        <span className="button" onClick={slideToPrev}>
          Previous
        </span>
        <span>/</span>
        <span className="button" onClick={slideToNext}>
          Next
        </span>
      </Nav>
    </Main>
  );
};

export default Slide0;
