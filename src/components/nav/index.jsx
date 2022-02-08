import { Link } from "react-router-dom";
import { Container, Effects, Effect, Name, List } from "./styles";

const Nav = () => {
  return (
    <Container>
      <Effects>
        <Effect>
          <Name>Hover</Name>
          <List>
            <Link to="hover0">hover0</Link>
          </List>
        </Effect>
        <Effect>
          <Name>Scroll</Name>
          <List>
            <Link to="scroll0">scroll0</Link>
            <Link to="scroll1">scroll1</Link>
          </List>
        </Effect>
        <Effect>
          <Name>Drag</Name>
          <List>
            <Link to="/">drag0</Link>
          </List>
        </Effect>
        <Effect>
          <Name>Slide</Name>
          <List>
            <Link to="slide0">slide0</Link>
          </List>
        </Effect>
      </Effects>
    </Container>
  );
};

export default Nav;
