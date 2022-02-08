import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";

import imgsrc from "./images/1.jpg";
import { Main, Columns, Column, Item, Scroll } from "./styles";

const Scroll0 = () => {
  const sliderRef = useRef();
  const sliderRef2 = useRef();
  const sliderRef3 = useRef();
  const scrollRef = useRef();

  const [y, setY] = useState(0);
  const [winHeight, setWinHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const sliderY =
      (sliderRef.current.getBoundingClientRect().height - winHeight) *
      (y / 100);
    const scrollY =
      (winHeight - scrollRef.current.getBoundingClientRect().height) *
      (y / 100);
    gsap.to(sliderRef.current, { y: sliderY });
    gsap.to(sliderRef2.current, { y: -sliderY });
    gsap.to(sliderRef3.current, { y: sliderY });
    gsap.to(scrollRef.current, { y: scrollY });
  }, [y, winHeight]);

  const resize = useCallback(() => {
    setWinHeight(window.innerHeight);
  }, []);

  const onWheel = useCallback((e) => {
    setY((prevState) => {
      if (e.deltaY > 0 && prevState < 100) return prevState + 5;
      if (e.deltaY < 0 && prevState > 0) return prevState - 5;
      return prevState;
    });
  }, []);

  return (
    <Main onWheel={onWheel}>
      <Columns>
        <Column className="column-reverse">
          <div ref={sliderRef}>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
          </div>
        </Column>
        <Column className="column">
          <div ref={sliderRef2}>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
          </div>
        </Column>
        <Column className="column-reverse">
          <div ref={sliderRef3}>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
            <Item>
              <div style={{ backgroundImage: `url(${imgsrc})` }} />
              <span>img1</span>
            </Item>
          </div>
        </Column>
      </Columns>
      <Scroll>
        <div ref={scrollRef} />
      </Scroll>
    </Main>
  );
};

export default Scroll0;
