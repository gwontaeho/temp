import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, Card } from "./styles";
import Calendar from "./components/calendar";
import Board from "./components/board";
import Write from "./components/write";

function App() {
  const screen = useSelector((state) => state.screen);
  const cardRef = useRef();

  useEffect(() => {
    console.log(screen);
    if (screen.current) cardRef.current.style.transform = "rotateY(180deg)";
    else cardRef.current.style.transform = "";
  }, [screen]);
  return (
    <Container>
      <Card ref={cardRef} className="card">
        <div className="front">
          <Calendar />
          <Board />
        </div>
        <div className="back">
          <Write />
        </div>
      </Card>
    </Container>
  );
}

export default App;
