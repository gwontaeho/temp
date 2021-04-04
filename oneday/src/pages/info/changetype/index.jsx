import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Container } from "./styles";
import axios from "axios";

const ChangeType = () => {
  const url =
    "crn/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId=";
  const xmlRaw =
    '<map id="ATTABZAA001R08"><pubcUserNo/><mobYn>N</mobYn><inqrTrgtClCd>1</inqrTrgtClCd><txprDscmNo>{CRN}</txprDscmNo><dongCode>15</dongCode><psbSearch>Y</psbSearch><map id="userReqInfoVO"/></map>';

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [reg, setReg] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("etc");

  useEffect(() => {}, []);

  const onChangeCompany = useCallback((e) => {
    setCompany(e.target.value);
  }, []);

  const onChangeReg = useCallback((e) => {
    setReg(e.target.value);
  }, []);

  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  const onClickFind = useCallback(async () => {
    try {
      const response = await axios.post(url, xmlRaw.replace(/\{CRN\}/, reg), {
        headers: { "Content-Type": "text/xml" },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [reg]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("abc");
      try {
        const response = await axios.post(
          "/api/changetype",
          {
            company,
            address,
            reg,
            category,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [company, address, reg, category]
  );

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <div>
          <div>업체 이름</div>
          <input type="text" value={company} onChange={onChangeCompany} />
        </div>
        <div>
          <div>사업자 등록번호</div>
          <input type="text" value={reg} onChange={onChangeReg} />
          <button type="button" onClick={onClickFind}>
            조회
          </button>
        </div>
        <div>
          <div>업체 주소</div>
          <input type="text" value={address} onChange={onChangeAddress} />
        </div>
        <div>
          <div>카테고리</div>
          <select onChange={onChangeCategory} defaultValue="etc">
            <option value="flower">플라워</option>
            <option value="baking">베이킹</option>
            <option value="perfume">향수</option>
            <option value="drawing">드로잉</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </Container>
  );
};

export default ChangeType;
