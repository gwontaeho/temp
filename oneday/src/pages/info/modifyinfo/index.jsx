import { useEffect } from "react";
import { Container, Header } from "./styles";

const ModifyInfo = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <form>
        <div>비밀번호</div>
        <input type="text" />
        <div>새 비밀번호</div>
        <input type="text" />
        <div>새 비밀번호 확인</div>
        <input type="text" />
        <div>이메일</div>
        <input type="text" />
        <div>연락처</div>
        <input type="text" />
      </form>
    </Container>
  );
};

export default ModifyInfo;
