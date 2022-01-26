import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";

import { setScreen } from "../../redux/screen/actions";
import { Container, Slider } from "./styles";
import Nav from "../../components/nav";
import Main from "./main";
import Profile from "./profile";
import Skills from "./skills";
import Projects from "./projects";

const Home = () => {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screen);
  const sliderRef = useRef();

  useEffect(() => {
    sliderRef.current.style.transform = `translateY(-${100 * screen.current}%)`;
  }, [screen]);

  const onWheel = debounce((e) => {
    if (e.deltaY > 0 && screen.current < 3)
      dispatch(setScreen(screen.current + 1));
    if (e.deltaY < 0 && screen.current > 0)
      dispatch(setScreen(screen.current - 1));
  }, 100);

  return (
    <Container onWheel={onWheel}>
      <Nav />
      <Slider ref={sliderRef}>
        <Main />
        <Profile />
        <Skills />
        <Projects />
      </Slider>
    </Container>
  );
};

export default Home;
