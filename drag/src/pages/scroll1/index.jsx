import { useRef, useState, useEffect, useCallback } from "react";
import anime from "animejs/lib/anime.es.js";
import { Main, Morph, Article, Section, Nav } from "./styles";
import { demo0, demo1 } from "./data";

const Scroll1 = () => {
  const svgRef = useRef();
  const pathRef = useRef();
  const polygonRef = useRef();

  const [demo, setDemo] = useState(0);
  const [section, setSection] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", changeSection);
    window.addEventListener("resize", changeSection);
    return () => {
      window.removeEventListener("scroll", changeSection);
      window.removeEventListener("resize", changeSection);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (demo === 0) demo0anime();
    if (demo === 1) demo1anime();
  }, [demo]);

  useEffect(() => {
    if (demo === 0) demo0anime();
    if (demo === 1) demo1anime();
  }, [section]);

  const changeSection = useCallback(() => {
    if (window.scrollY > window.innerHeight / 5 + window.innerHeight * 4)
      return setSection(5);
    if (window.scrollY > window.innerHeight / 5 + window.innerHeight * 3)
      return setSection(4);
    if (window.scrollY > window.innerHeight / 5 + window.innerHeight * 2)
      return setSection(3);
    if (window.scrollY > window.innerHeight / 5 + window.innerHeight)
      return setSection(2);
    if (window.scrollY > window.innerHeight / 5) return setSection(1);
    if (window.scrollY < window.innerHeight / 5) return setSection(0);
  }, []);

  const demo0anime = useCallback(() => {
    anime.remove(svgRef.current);
    anime.remove(pathRef.current);
    anime({
      targets: svgRef.current,
      duration: demo0[section].animation.svg.duration,
      easing: demo0[section].animation.svg.easing,
      elasticity: demo0[section].animation.svg.elasticity || 0,
      scaleX: demo0[section].scaleX,
      scaleY: demo0[section].scaleY,
      translateX: demo0[section].tx + "px",
      translateY: demo0[section].ty + "px",
      rotate: demo0[section].rotate + "deg",
    });
    anime({
      targets: pathRef.current,
      duration: demo0[section].animation.path.duration,
      easing: demo0[section].animation.path.easing,
      elasticity: demo0[section].animation.path.elasticity || 0,
      d: demo0[section].path,
      fill: {
        value: demo0[section].fill.color,
        duration: demo0[section].fill.duration,
        easing: demo0[section].fill.easing,
      },
      complete: () => demo0loop(),
    });
  }, [section]);

  const demo1anime = useCallback(() => {
    anime.remove(svgRef.current);
    anime.remove(polygonRef.current);
    anime({
      targets: svgRef.current,
      duration: 1500,
      easing: "easeOutElastic",
      scale: demo1[section].scale,
      translateX: demo1[section].tx + "px",
      translateY: demo1[section].ty + "px",
      rotate: demo1[section].rotate + "deg",
    });
    anime({
      targets: polygonRef.current,
      duration: 500,
      easing: "easeOutExpo",
      points: demo1[section].points,
    });
  }, [section]);

  const demo0loop = useCallback(() => {
    anime.remove(pathRef.current);
    anime({
      targets: pathRef.current,
      easing: "linear",
      d: [
        { value: demo0[section].pathAlt, duration: 1500 },
        { value: demo0[section].path, duration: 1500 },
      ],
      loop: true,
      fill: {
        value: demo0[section].fill.color,
        duration: demo0[section].fill.duration,
        easing: demo0[section].fill.easing,
      },
      direction: "alternate",
    });
  }, [section]);

  return (
    <Main className={`demo${demo}`}>
      <Morph>
        {demo === 0 && (
          <svg ref={svgRef} viewBox="0 0 1400 770">
            <path
              ref={pathRef}
              d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z"
            />
          </svg>
        )}
        {demo === 1 && (
          <svg ref={svgRef} className={`demo${demo}`} viewBox="0 0 1400 770">
            <polygon
              ref={polygonRef}
              points="700,84.4 1047.1,685.6 352.9,685.6 352.9,685.6 352.9,685.6 352.9,685.6"
            />
          </svg>
        )}
      </Morph>
      <Article>
        <Section></Section>
        <Section></Section>
        <Section></Section>
        <Section></Section>
        <Section></Section>
        <Section></Section>
      </Article>
      <Nav>
        <span onClick={() => setDemo(0)}>01.</span>
        <span onClick={() => setDemo(1)}>02.</span>
      </Nav>
    </Main>
  );
};

export default Scroll1;
