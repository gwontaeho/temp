import { useCallback, useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { Container, Header, Nav, Classes } from "./styles";

const Category = ({ match }) => {
  const [classArray, setClassArray] = useState([]);

  useEffect(async () => {
    const category = match.params.category;
    try {
      const response = await axios.post("/api/category", {});
      setClassArray(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 정렬
  const onClickNav = useCallback((e) => {
    const sort = e.target.getAttribute("value");
  }, []);

  // 클래스
  const classList = classArray.map((v) => {
    return (
      <Link to={`/product/${v.id}`} key={v.id} className="class">
        <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
        <div>{v.name}</div>
        <div>{v.price}원</div>
      </Link>
    );
  }, []);

  return (
    <Container>
      <Header>전체</Header>
      <Nav>
        <div value="sale" onClick={onClickNav}>
          판매순
        </div>
        <div value="star" onClick={onClickNav}>
          평점순
        </div>
        <div value="review" onClick={onClickNav}>
          리뷰순
        </div>
        <div value="lowPrice" onClick={onClickNav}>
          낮은 가격순
        </div>
        <div value="highPrice" onClick={onClickNav}>
          높은 가격순
        </div>
      </Nav>
      <Classes>{classList}</Classes>
    </Container>
  );
};

export default Category;
