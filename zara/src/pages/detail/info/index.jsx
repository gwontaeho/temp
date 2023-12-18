import { useCallback, useRef, useState } from "react";

import { Container, Content, Button } from "./styles";
import water from "../../../images/info/CARE_FOR_WATER_0.jpg";
import recycle from "../../../images/info/RECYCLED_POLYESTER_0.jpg";

const Info = () => {
  const contentRef = useRef();

  const [hide, setHide] = useState(true);

  const onClick = useCallback(() => {
    if (!hide) contentRef.current.scrollTo(0, 0);
    setHide(!hide);
  }, [hide]);

  return (
    <Container style={{ height: hide ? "50%" : "80%" }}>
      <Content style={{ overflowY: hide ? "hidden" : "" }} ref={contentRef}>
        <div className="title">소재, 세탁 방법 및 원산지</div>
        <div>JOIN LIFE</div>
        <div>Care for fiber & water: 50% 이상 재생 폴리에스터 사용.</div>
        <div>
          환경에 미치는 영향을 줄일 수 있는 기법과 원자재를 이용하여 제조되는
          제품에 Join Life라는 이름의 태그를 부착합니다.
        </div>
        <div>소재</div>
        <div>
          ZARA는 제품의 안전, 보건 및 품질 기준 준수를 보장하기 위해 모니터링
          프로그램을 실행하고 있습니다.
        </div>
        <div>
          Green to Wear 2.0 표준은 섬유 생산이 환경에 미치는 영향을 최소화하는
          것을 목표로 합니다. 이를 위해 생산 공정의 청결과 의류의 안전 및 보건을
          모두 보장하는 데 도움이 되는 Inditex The List 프로그램을 개발했습니다.
        </div>
        <div>겉감</div>
        <div>100% 폴리에스터</div>
        <div>안감</div>
        <div>100% 폴리에스터</div>
        <div>재생 폴리에스터</div>
        <div>
          재생 폴리에스터는 플라스틱병과 같은 PET 플라스틱을 재활용하여
          생산합니다.
        </div>
        <div>
          플라스틱병은 재활용 쓰레기통에 버려질 때마다 폐기물을 선택하고
          분류하는 처리장으로 이동합니다. 이곳에서 가장 적합한 용도로 사용될 수
          있도록 다양한 플라스틱 유형별로 분류됩니다. PET 플라스틱은 세척, 분쇄
          및 재생되어 새로운 재생 폴리에스터 섬유로 만들어집니다.
        </div>
        <div>
          이런 방법으로 플라스틱 폐기물에 새로운 용도를 주고, 천연 원자재 소비를
          줄여 물과 에너지 소비와 폐기물 생성을 줄일 수 있습니다.
        </div>
        <div>
          재생사는 원래의 폴리에스터와 유사한 특성을 가져 내구성이 뛰어나고
          강하며 언제나 다시 재활용될 수 있습니다.
        </div>
        <div>인증</div>
        <div>
          ZARA는 원자재에서 최종 제품이 만들어지기까지의 절차를 모니터링하는
          단체의 인증을 받은 재생 폴리에스터만을 사용합니다. 현재 다음과 같은
          단체와 협력합니다.
        </div>
        <div>Global Recycled Standard(GRS)</div>
        <div>Recycled Content Standard(RCS)</div>
        <div>환경 혜택</div>
        <div>재활용은 천연자원 소모를 줄입니다</div>
        <div>물 소비량 감소</div>
        <div>에너지 소비 감소</div>
        <img src={water} alt="water" />
        <div>
          이러한 의류는 생산 공정에서 물 소모를 줄이는 기술로 생산됩니다.
        </div>
        <div>
          의류를 염색 또는 세탁하는 과정은 많은 물을 소비해야 하는 과정입니다.
          물을 재사용할 수 있는 폐쇄 사이클을 이용하거나, 이러한 공정에서 물
          소비를 줄이는 저욕비 기기 또는 대량 염색과 같은 기술을 사용하면 담수
          자원을 보존하는 데 도움이 됩니다.
        </div>
        <div>인증</div>
        <div>
          이 제품은 Inditex 그룹이 개발한 Join Life 기준에 따라 제조되었으며
          국제적으로 표준화된 방법인 전 과정 평가(Life-cycle assessment)를
          기반으로 하여 생산, 사용 및 수명 종료와 같은 여러 단계에서 제품이
          미치는 영향을 평가할 수 있습니다.
        </div>
        <div>
          기준 준수 여부를 평가하기 위해 전문 외부 기업을 통해 감사 프로그램을
          개발하였습니다.
        </div>
        <div>환경 혜택</div>
        <div>물 소비량 감소</div>
        <div>배출 감소</div>
        <img src={recycle} alt="recycle" />
        <div>관리</div>
        <div>환경을 보호하며 의류를 관리할 수 있습니다</div>
        <div>
          재킷과 코트를 깨끗하게 유지하려면 환기시키고, 천으로 닦거나 의류용
          솔로 솔질해줄 수 있습니다. 드라이클리닝이 필요한 경우, 환경 친화적인
          기술을 사용하는 드라이클리닝 업체를 이용하십시오.
        </div>
        <div>물세탁 금지</div>
        <div>표백제 사용 금지</div>
        <div>최고 110도 다림질 가능</div>
        <div>테트라클로로에틸렌 드라이클리닝</div>
        <div>건조기 사용 금지</div>
        <div>출처</div>
        <div>
          ZARA는 공급업체, 근로자, 노조 및 다양한 국제 기구와 협력하여 인권을
          존중하고 고취하며 UN의 지속 가능한 개발 목표에 기여할 수 있는 공급망을
          개발합니다.
        </div>
        <div>
          또한 공급업체와의 지속적인 협력을 통해 ZARA의 의류가 어디에서 어떻게
          제조되었는지 알 수 있는 추적 프로그램을 개발하였습니다.
        </div>
      </Content>
      <Button onClick={onClick}>{hide ? "더 보기" : "감추기"}</Button>
    </Container>
  );
};

export default Info;
