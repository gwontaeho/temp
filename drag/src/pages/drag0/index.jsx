import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { Main, SliderContainer, Slider, Item, Cover } from "./styles";
import { data } from "./data";

const Drag0 = () => {
  const mainRef = useRef();
  const sliderRef = useRef();
  const itemRef = useRef([]);
  const imgRef = useRef([]);
  const coverRef = useRef();

  const [isDown, setIsDown] = useState(false);
  const [pos, setPos] = useState();
  const [x, setX] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", fixPos);
    return () => {
      window.removeEventListener("resize", fixPos);
    };
  }, []);

  useEffect(() => {
    gsap.to(sliderRef.current, { duration: 0.4, x: x, onComplete: fixPos });
  }, [x, isDown]);

  const dragStart = useCallback((e) => {
    itemRef.current.forEach((el) => {
      gsap.to(el, { duration: 0.4, scale: 0.9 });
    });
    imgRef.current.forEach((el) => {
      gsap.to(el, { duration: 0.4, scale: 1.4 });
    });
    gsap.to(coverRef.current, { duration: 0.4, opacity: 1 });

    setPos(e.clientX);
    setIsDown(true);
  }, []);

  const dragEnd = useCallback(() => {
    itemRef.current.forEach((el) => {
      gsap.to(el, { duration: 0.4, scale: 1 });
    });
    imgRef.current.forEach((el) => {
      gsap.to(el, { duration: 0.4, scale: 1 });
    });
    gsap.to(coverRef.current, { duration: 0.4, opacity: 0 });

    fixPos();
    setIsDown(false);
  }, []);

  const drag = useCallback(
    (e) => {
      if (isDown) {
        if (
          sliderRef.current.getBoundingClientRect().left >
            window.innerWidth - mainRef.current.getBoundingClientRect().width ||
          sliderRef.current.getBoundingClientRect().right < window.innerWidth
        ) {
          setX((prevState) => prevState + (e.clientX - pos) / 3);
        } else {
          setX((prevState) => prevState + e.clientX - pos);
        }
        setPos(e.clientX);
      }
    },
    [isDown, pos]
  );

  const fixPos = useCallback(() => {
    if (
      !isDown &&
      sliderRef.current.getBoundingClientRect().left >
        window.innerWidth - mainRef.current.getBoundingClientRect().width
    )
      setX(0);
    if (
      !isDown &&
      sliderRef.current.getBoundingClientRect().right < window.innerWidth
    )
      setX(
        mainRef.current.getBoundingClientRect().width -
          sliderRef.current.getBoundingClientRect().width
      );
  }, [isDown]);

  return (
    <Main ref={mainRef}>
      <SliderContainer
        onPointerDown={dragStart}
        onPointerUp={dragEnd}
        onPointerLeave={dragEnd}
        onMouseMove={drag}
      >
        <Slider ref={sliderRef}>
          {data.map((v, i) => (
            <Item key={v.key} ref={(ref) => (itemRef.current[i] = ref)}>
              <span>{v.key}</span>
              <div>
                <div
                  ref={(ref) => (imgRef.current[i] = ref)}
                  style={{
                    backgroundImage: `url(${v.imgSrc})`,
                    width: v.width,
                    height: v.height,
                  }}
                />
              </div>
            </Item>
          ))}
        </Slider>
      </SliderContainer>
      <Cover ref={coverRef}></Cover>
    </Main>
  );
};

export default Drag0;
