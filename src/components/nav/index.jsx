import { useSelector, useDispatch } from "react-redux";
import { setScreen } from "../../redux/screen/actions";

import { Container } from "./styles";

const Nav = () => {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screen);

  return (
    <Container>
      {[0, 1, 2, 3].map((element) => {
        return (
          <div
            key={element}
            className={screen.current === element ? "current" : undefined}
            onClick={() => dispatch(setScreen(element))}
          />
        );
      })}
    </Container>
  );
};

export default Nav;
