import { Container, Marketing, Sitemap, Nav, Legal } from "./styles";

const Footer = () => {
  return (
    <Container>
      <Marketing>
        <div>뉴스레터에 가입하세요</div>
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
      <Sitemap>
        <ul>
          <li className="title">도움말</li>
          <li>
            <a>ZARA.COM에서 구매하기</a>
          </li>
          <li>
            <a>제품</a>
          </li>
          <li>
            <a>지불</a>
          </li>
          <li>
            <a>배송</a>
          </li>
          <li>
            <a>교환 및 환불</a>
          </li>
          <li>
            <a>매장 및 기업</a>
          </li>
          <li>
            <a>의류 수거 프로그램</a>
          </li>
          <li>
            <a>내 계정</a>
          </li>
        </ul>
        <ul>
          <li className="title">FOLLOW하기</li>
          <li>
            <a>뉴스레터</a>
          </li>
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
        <ul>
          <li className="title">회사</li>
          <li>
            <a>회사소개</a>
          </li>
          <li>
            <a>사무소</a>
          </li>
          <li>
            <a>매장</a>
          </li>
          <li>
            <a>자라에서 일하세요</a>
          </li>
        </ul>
        <ul>
          <li className="title">정책</li>
          <li>
            <a>개인정보보호정책</a>
          </li>
          <li>
            <a>이용약관</a>
          </li>
          <li>
            <a>쿠키 설정</a>
          </li>
        </ul>
      </Sitemap>
      <Nav>
        <div>SOUTH KOREA / 대한민국</div>
        <div>ZARA</div>
      </Nav>
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
