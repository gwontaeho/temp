import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Header, Nav, Classes } from "./styles";
import { IoLocationOutline } from "react-icons/io5";
import Rating from "@material-ui/lab/Rating";

const Category = (props) => {
  const [classArray, setClassArray] = useState([]);

  useEffect(() => {
    console.log(props.match.params.category);
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/category`, {
          category: props.match.params.category,
          sort: "rating",
        });
        setClassArray(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [props]);

  // 정렬
  const onClickNav = useCallback(
    async (e) => {
      const sort = e.target.getAttribute("value");
      console.log(sort);
      try {
        const response = await axios.post(`/api/category`, {
          category: props.match.params.category,
          sort,
        });
        setClassArray(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [props]
  );

  // 클래스
  const classList = classArray.map((v) => {
    return (
      <Link to={`/product/${v.id}`} key={v.id} className="class">
        <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
        <div className="address">
          <IoLocationOutline />
          {v.address.split("&")[0]}
        </div>
        <div className="rating">
          {Array.isArray(v.reviews) && v.reviews.length !== 0 ? (
            <Rating
              name="half-rating-read"
              defaultValue={v.reviews[0].rating}
              precision={0.1}
              readOnly
            />
          ) : null}
        </div>
        <div>{v.name}</div>
        <div>{v.price}원</div>
      </Link>
    );
  }, []);

  return (
    <Container>
      <Header>
        {props.match.params.category === "all"
          ? "전체"
          : props.match.params.category === "flower"
          ? "플라워"
          : props.match.params.category === "art"
          ? "미술"
          : props.match.params.category === "cooking"
          ? "요리"
          : props.match.params.category === "handmade"
          ? "수공예"
          : props.match.params.category === "activity"
          ? "액티비티"
          : "기타"}
      </Header>
      <Nav>
        <div value="rating" onClick={onClickNav}>
          평점순
        </div>
        <div value="sold" onClick={onClickNav}>
          판매순
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
