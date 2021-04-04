import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

const ManageClass = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <Link to="/info/createclass">클래스 생성</Link>
    </Container>
  );
};

export default ManageClass;
