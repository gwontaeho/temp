import { Container, Marketing, Legal } from "./styles";

const Footer = () => {
  return (
    <Container>
      <Marketing>
        <div className="title">뉴스레터에 가입하세요</div>
        <input placeholder="여기에 이메일을 입력하세요" />
        <div className="social">
          <ul>
            <li>
              <a>TIKTOK</a>
            </li>
            <li>
              <a>INSTAGRAM</a>
            </li>
            <li>
              <a>FACEBOOK</a>
            </li>
            <li>
              <a>TWITTER</a>
            </li>
            <li>
              <a>PINTEREST</a>
            </li>
            <li>
              <a>KAKAO</a>
            </li>
            <li>
              <a>YOUTUBE</a>
            </li>
          </ul>
        </div>
      </Marketing>

      <Legal>
        <div>
          아이티엑스코리아 유한회사 ｜ 사업자등록번호: 120-88-14733 ｜ 대표자:
          ROMAY DE LA COLINA JOSE MANUEL ｜ 서울시 강남구 영동대로 511 (삼성동,
          트레이드타워 33층) ｜ 대표번호: 080-479-0880 | 이메일:
          CONTACT.KR@ZARA.COM ｜ 호스팅 서비스 사업자: ITX MERKEN, B.V. ｜
          통신판매업신고: 제2014-서울강남-02297 (<a>사업자정보확인</a>) ｜{" "}
          <a>개인정보처리방침</a> ｜ <a>이용약관</a>
        </div>
      </Legal>
    </Container>
  );
};

export default Footer;
