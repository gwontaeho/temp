import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import icon_news from "../../images/home/6562f7bc017800001.png";
import icon_stock from "../../images/home/ico_stock.png";
import icon_responsible from "../../images/home/ico_responsible.png";
import icon_customer from "../../images/home/ico_customer.png";
import icon_privacy from "../../images/home/ico_privacy.png";
import icon_tech from "../../images/home/6564a0f6017800001.png";
import thumb from "../../images/home/1d370636017e00001.jpg";
import thumb2 from "../../images/home/03886805017e00001.png";
import thumb3 from "../../images/home/c363d935017800001.png";
import thumb4 from "../../images/home/dfa689e9017d00001.jpg";
import culture from "../../images/home/bg_home_culture_210325.png";

import {
  Container,
  Title,
  Section,
  Item,
  Inner,
  Card,
  Culture,
  Etc,
  Collection,
} from "./styles";

const Home = () => {
  const containerRef = useRef();
  const mode = useSelector((state) => state.mode);

  useEffect(() => {
    if (mode.dark) containerRef.current.classList.add("dark");
    else containerRef.current.classList.remove("dark");
  }, [mode]);

  return (
    <Container ref={containerRef}>
      <Title>
        <div className="calendar">오늘의 카카오</div>
        <div>1월 3일 월요일 소식입니다</div>
      </Title>
      <Section>
        <Item className="fix">
          <Inner>
            <Card className="card-fix card">
              <div className="header">
                <img className="icon" src={icon_news} alt="icon_news" />
                <span className="text">보도자료</span>
              </div>
              <div className="title">
                카카오, 미래이니셔티브센터 신규 임원 선임
              </div>
              <div className="info">
                <span>#미래이니셔티브센터</span>
                <span>#남궁훈</span>
                <span>#임원인사</span>
              </div>
              <div className="img">
                <img src={thumb} alt="thumb" />
              </div>
            </Card>
          </Inner>
        </Item>
        <Item className="responsive">
          <Inner>
            <Card className="card-res-1 card">
              <div className="header">
                <img className="icon" src={icon_news} alt="icon_news" />
                <span className="text">보도자료</span>
              </div>
              <div className="title2">
                카카오, 올 한 해 글로벌 25개 학회에서 총 40건 AI 논문 등재
              </div>
              <div className="info">
                <span>#AI논문</span>
                <span>#AI카카오브레인</span>
              </div>
              <div className="img">
                <img src={thumb2} alt="thumb2" />
              </div>
            </Card>
            <Card className="card-res-2 card">
              <div className="header">
                <img className="icon" src={icon_stock} alt="icon_stock" />
                <span className="text">주가정보</span>
              </div>
              <div className="stock">
                <span className="num">100,500</span>
              </div>
              <div className="info">
                <span>2022.01.06 09:58AM</span>
              </div>
            </Card>
            <Card className="card-res-3 card">
              <div className="header">
                <img
                  className="icon"
                  src={icon_responsible}
                  alt="icon_responsible"
                />
                <span className="text">약속과 책임</span>
              </div>
              <div className="title2">
                카카오는 당신과 함께 더 나은 세상을 만듭니다.
              </div>
              <div className="info">
                <span>#약속과책임</span>
                <span>#esg</span>
                <span>#소셜임팩트</span>
              </div>
            </Card>
          </Inner>
        </Item>
      </Section>
      <Culture className="culture">
        <div className="title">기술과 사람으로 더 나은 세상을 만듭니다.</div>
        <a>카카오문화 바로가기</a>
        <img src={culture} alt="culture" />
      </Culture>
      <Section>
        <Item className="responsive">
          <Inner>
            <Card className="card-res-1 card">
              <div className="header">
                <img className="icon" src={icon_tech} alt="icon_tech" />
                <span className="text">기술 서비스</span>
              </div>
              <div className="title2">
                AI 같이 할래요 ?<br />
                Tech Ground
              </div>
              <div className="info">
                <span>#ai</span>
                <span>#comprehension</span>
                <span>#ocr</span>
                <span>#search</span>
                <span>#tech</span>
              </div>
              <div className="img">
                <img src={thumb3} alt="thumb3" />
              </div>
            </Card>
            <Card className="card-res-2 card">
              <div className="header">
                <img className="icon" src={icon_customer} alt="icon_customer" />
                <span className="text">고객센터</span>
              </div>
              <div className="tit_card">어떤 서비스를 도와드릴까요?</div>
              <ul className="customer">
                <li>
                  <a>카카오</a>
                </li>
                <li>
                  <a>다음</a>
                </li>
                <li>
                  <a>멜론</a>
                </li>
              </ul>
            </Card>
            <Card className="card-res-3 card">
              <div className="header">
                <img className="icon" src={icon_privacy} alt="icon_privacy" />
                <span className="text">카카오 프라이버시</span>
              </div>
              <div className="title2">
                데이터의 연결과 보호의 균형을 위한 카카오의 노력
              </div>
              <div className="info">
                <span>#카카오프라이버시</span>
              </div>
            </Card>
          </Inner>
        </Item>
        <Item className="fix">
          <Inner>
            <Card className="card-fix card">
              <div className="header">
                <img className="icon" src={icon_news} alt="icon_news" />
                <span className="text">보도자료</span>
              </div>
              <div className="title">
                카카오, 카카오톡 '톡캘린더' 기능 웹버전 출시
              </div>
              <div className="info">
                <span>#카카오</span>
                <span>#카카오톡</span>
                <span>#톡캘린더</span>
                <span>#웹버전</span>
              </div>
              <div className="img">
                <img src={thumb4} alt="thumb4" />
              </div>
            </Card>
          </Inner>
        </Item>
      </Section>
      <Etc>
        <div>
          <div className="service">
            <div className="title">사람과 기술로 일상을 돕는 카카오 서비스</div>
            <div className="txt_item">서비스 바로가기</div>
          </div>
        </div>
        <div>
          <div className="recruit">
            <div className="title">
              세상만사에 관심이 많다면, 당신은 이미 카카오 크루
            </div>
            <div className="txt_item">인재영입 바로가기</div>
          </div>
        </div>
      </Etc>
      <Collection className="collection">
        <div>카카오 소식 모아보기</div>
      </Collection>
    </Container>
  );
};

export default Home;
