import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";

import { Main, Slide, Nav } from "./styles";
import { imgs } from "./data";

const Slide0 = () => {
  const wrapRef = useRef([]);
  const imgRef = useRef([]);
  const [prev, setPrev] = useState(-1);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  useEffect(() => {
    if (prev !== -1) {
      if (direction === 0) leftEffect();
      if (direction === 1) rightEffect();
    }
  }, [direction, prev, current]);

  const slideToLeft = useCallback(() => {
    setDirection(0);
    setPrev(current);
    if (current === 0) setCurrent(imgRef.current.length - 1);
    else setCurrent((prevState) => prevState - 1);
  }, [current]);

  const slideToRight = useCallback(() => {
    setDirection(1);
    setPrev(current);
    if (current === imgRef.current.length - 1) setCurrent(0);
    else setCurrent((prevState) => prevState + 1);
  }, [current]);

  const leftEffect = useCallback(() => {
    gsap.to(wrapRef.current[prev], {
      startAt: { x: "100%" },
      duration: 1.2,
      ease: "Expo.easeInOut",
      x: "0%",
    });

    gsap.to(imgRef.current[prev], {
      duration: 1.2,
      ease: "Expo.easeInOut",
      x: "100%",
      scale: 1.1,
      onComplete: () => (imgRef.current[prev].style.opacity = "0"),
    });
    gsap.to(imgRef.current[current], {
      startAt: { zIndex: 100, opacity: 1, x: "-100%", scale: 1.1 },
      duration: 1.2,
      ease: "Expo.easeInOut",
      x: "0%",
      scale: 1,
      onComplete: () => (imgRef.current[current].style.zIndex = 99),
    });
  }, [prev, current]);

  const rightEffect = useCallback(() => {
    gsap.to(wrapRef.current[prev], {
      startAt: { x: "-100%" },
      duration: 1.2,
      ease: "Expo.easeInOut",
      x: "0%",
    });

    gsap.to(imgRef.current[prev], {
      duration: 1.2,
      ease: "Expo.easeInOut",
      x: "-100%",
      scale: 1.1,
    });
    gsap.to(imgRef.current[current], {
      startAt: { zIndex: 100, opacity: 1, x: "100%", scale: 1.1 },
      duration: 1.2,
      ease: "Expo.easeInOut",
      x: "0%",
      scale: 1,
      onComplete: () => (imgRef.current[current].style.zIndex = 99),
    });
  }, [prev, current]);

  return (
    <Main>
      <Slide>
        <div ref={(ref) => (wrapRef.current[0] = ref)}>
          <div
            ref={(ref) => (imgRef.current[0] = ref)}
            style={{ backgroundImage: `url(${imgs[0].img})` }}
          ></div>
        </div>
        <div ref={(ref) => (wrapRef.current[1] = ref)}>
          <div
            ref={(ref) => (imgRef.current[1] = ref)}
            style={{ backgroundImage: `url(${imgs[1].img})` }}
          ></div>
        </div>
        <div ref={(ref) => (wrapRef.current[2] = ref)}>
          <div
            ref={(ref) => (imgRef.current[2] = ref)}
            style={{ backgroundImage: `url(${imgs[2].img})` }}
          ></div>
        </div>
        <div ref={(ref) => (wrapRef.current[3] = ref)}>
          <div
            ref={(ref) => (imgRef.current[3] = ref)}
            style={{ backgroundImage: `url(${imgs[3].img})` }}
          ></div>
        </div>
      </Slide>
      <Nav>
        <svg onClick={slideToLeft} viewBox="0 0 16 24">
          <path d="M15.45 2.8L12.65 0l-12 12 12 12 2.8-2.8-9.2-9.2z" />
        </svg>
        <svg onClick={slideToRight} className="rotate" viewBox="0 0 16 24">
          <path d="M15.45 2.8L12.65 0l-12 12 12 12 2.8-2.8-9.2-9.2z" />
        </svg>
      </Nav>
    </Main>
  );
};

export default Slide0;
