import { Container, Inner, Service, Relation } from "./styles";

const Footer = () => {
  return (
    <Container>
      <Inner>
        <Service>
          <div>
            <strong>
              <span>카카오</span>
              <span className="icon">〉</span>
            </strong>
            <ul>
              <li>카카오 문화</li>
              <li>공동체</li>
              <li>히스토리</li>
            </ul>
          </div>
          <div>
            <strong>
              <span>뉴스</span>
              <span className="icon">〉</span>
            </strong>
          </div>
          <div>
            <strong>
              <span>기술과 서비스</span>
              <span className="icon">〉</span>
            </strong>
            <ul>
              <li>기술</li>
              <li>서비스</li>
            </ul>
          </div>
          <div>
            <strong>
              <span>약속과 책임</span>
              <span className="icon">〉</span>
            </strong>
            <ul>
              <li>ESG</li>
              <li>소셜임팩트</li>
              <li>디지털 권리</li>
              <li>AI 윤리</li>
            </ul>
          </div>
          <div>
            <strong>
              <span>투자정보</span>
              <span className="icon">〉</span>
            </strong>
            <ul>
              <li>기업지배구조</li>
              <li>주가정보</li>
              <li>재무정보</li>
              <li>IR행사</li>
              <li>공시정보</li>
              <li>공고</li>
            </ul>
          </div>
          <div>
            <strong>
              <span>고객센터</span>
              <span className="icon">〉</span>
            </strong>
            <ul>
              <li>카카오 고객센터</li>
              <li>Daum 고객센터</li>
            </ul>
            <strong className="strong">인재영입</strong>
            <strong className="strong">카카오계정</strong>
          </div>
        </Service>
        <Relation>
          <div className="group_info">
            <div>이용약관</div>
            <div>위치기반서비스이용약관</div>
            <div>개인정보처리방침</div>
            <div>운영정책</div>
            <div>청소년보호정책</div>
            <div>권리침해신고안내</div>
            <div>공지사항</div>
            <div>사이버윤리실</div>
            <div>Contact Us</div>
          </div>
          <div className="relation">관련사이트</div>
          <div className="copyright">© Kakao Corp. All rights reserved.</div>
        </Relation>
      </Inner>
    </Container>
  );
};

export default Footer;
