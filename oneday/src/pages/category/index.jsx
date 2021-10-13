import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Container, Header, Nav, Products } from "./styles";
import { IoLocationOutline } from "react-icons/io5";
import Rating from "@material-ui/lab/Rating";

const Category = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    requestProductData();
  }, [props]);

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/product/category?name=${query.name}&sort=${query.sort}`
      );
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  // 클래스
  const productList = productData.map((v) => {
    return (
      <Link to={`/product?id=${v.id}`} key={v.id}>
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
        {query.name === "all"
          ? "전체"
          : query.name === "flower"
          ? "플라워"
          : query.name === "art"
          ? "미술"
          : query.name === "cooking"
          ? "요리"
          : query.name === "handmade"
          ? "수공예"
          : query.name === "activity"
          ? "액티비티"
          : "기타"}
      </Header>
      <Nav>
        <Link to={`/category?name=${query.name}&sort=rating`}>평점순</Link>
        <Link to={`/category?name=${query.name}&sort=sold`}>판매순</Link>
        <Link to={`/category?name=${query.name}&sort=low`}>낮은 가격순</Link>
        <Link to={`/category?name=${query.name}&sort=high`}>높은 가격순</Link>
      </Nav>
      <Products>{productList}</Products>
    </Container>
  );
};

export default Category;
