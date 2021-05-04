import { Container, Ad, Contents } from "./styles";

const Main = () => {
  return (
    <Container>
      {/* 광고 */}
      <Ad>123</Ad>

      {/* 인기있는 업체 */}
      <Contents>인기있는 업체</Contents>
      <Contents>최근 등록한 업체</Contents>
    </Container>
  );
};

export default Main;
