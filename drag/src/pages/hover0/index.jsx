import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { Main, Screens, Screen, Full, Clip, Nav } from "./styles";
import { imgs } from "./data";

const Hover0 = () => {
  const screenRefs = useRef([]);

  const [screen, setScreen] = useState({ prev: null, current: null });

  useEffect(() => {
    setScreen((prevState) => ({
      ...prevState,
      current: screenRefs.current[0],
    }));
  }, []);

  useEffect(() => {
    gsap.killTweensOf([screen.current, screen.prev]);
    if (screen.current) {
      const full = screen.current.querySelector(".full");
      gsap
        .timeline()
        .set(screen.current, { opacity: 1, zIndex: 1 })
        .to(full, {
          duration: 1.8,
          ease: "Power2.easeOut",
          startAt: { scale: 1.07 },
          scale: 1,
        });
    }
    if (screen.prev)
      gsap
        .timeline()
        .set(screen.prev, { zIndex: 10 })
        .to(screen.prev, {
          duration: 0.4,
          ease: "Power2.easeOut",
          opacity: 0,
          onComplete: () => gsap.set(screen.prev, { zIndex: 1 }),
        });
  }, [screen]);

  const onMouseEnter = useCallback(
    (v) => {
      if (screen.current !== v)
        setScreen((prevState) => ({
          ...prevState,
          prev: prevState.current,
          current: v,
        }));
    },
    [screen]
  );

  return (
    <Main>
      <Screens>
        {imgs.map((img) => {
          return (
            <Screen
              key={img.id}
              ref={(ref) => (screenRefs.current[img.id] = ref)}
            >
              <Full
                className="full"
                style={{ backgroundImage: `url(${img.img})` }}
              />
              <Clip style={{ backgroundImage: `url(${img.img})` }} />
            </Screen>
          );
        })}
      </Screens>
      <Nav>
        <div>
          {screenRefs.current.map((ref, i) => (
            <span key={imgs[i].id} onMouseEnter={() => onMouseEnter(ref)}>
              {imgs[i].title}
            </span>
          ))}
        </div>
      </Nav>
    </Main>
  );
};

export default Hover0;
