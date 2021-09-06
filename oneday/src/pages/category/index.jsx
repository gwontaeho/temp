import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Header, Nav, Classes } from "./styles";

const Category = (props) => {
  const [classArray, setClassArray] = useState([]);

  useEffect(() => {
    console.log(props.match.params);

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/category/all", {});
        console.log(response.data);
        // response.data.rows.forEach((v) => {
        //   let rating = 0;
        //   if (v.reviews.length !== 0) {
        //     v.reviews.forEach((vv) => {
        //       rating += vv.rating;
        //     });
        //     rating = Math.round((rating / v.reviews.length) * 10) / 10;
        //   }
        //   v.rating = rating;
        // });
        // console.log(response.data.rows);
        // setClassArray(response.data.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // 정렬
  const onClickNav = useCallback(
    (e) => {
      const sort = e.target.getAttribute("value");
      let ary = [...classArray];
      switch (sort) {
        case "sale":
          ary.sort((a, b) => {
            return b.reservations.length - a.reservations.length;
          });
          setClassArray(ary);
          break;
        case "rating":
          ary.sort((a, b) => {
            return b.rating - a.rating;
          });
          setClassArray(ary);
          break;
        case "lowPrice":
          ary.sort((a, b) => {
            return a.price - b.price;
          });
          setClassArray(ary);
          break;
        case "highPrice":
          ary.sort((a, b) => {
            return b.price - a.price;
          });
          setClassArray(ary);
          break;
        default:
          break;
      }
    },
    [classArray]
  );

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
        <div value="rating" onClick={onClickNav}>
          평점순
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
