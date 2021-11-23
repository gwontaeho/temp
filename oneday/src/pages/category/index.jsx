import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Header, Nav, List, Item } from "./styles";
import { LocationOnOutlined } from "@mui/icons-material";
import Rating from "@material-ui/lab/Rating";
import Skeleton from "@mui/material/Skeleton";

const Category = (props) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestProductData("rating");
  }, [props]);

  const requestProductData = useCallback(
    async (sort) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/product/category?name=${props.match.params.category}&sort=${sort}`
        );
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [props]
  );

  // 클래스
  const productList = productData.map((v) => {
    const defaultValue =
      Array.isArray(v.reviews) && v.reviews.length !== 0
        ? Number(v.reviews[0].rating)
        : 0;
    return (
      <Item key={v.id}>
        <Link to={`/product?id=${v.id}`}>
          <div className="img">
            <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
            <div className="rating">
              <Rating
                name="half-rating-read"
                defaultValue={defaultValue}
                precision={0.1}
                readOnly
              />
            </div>
          </div>
          <div className="info">
            <div className="address">
              <LocationOnOutlined />
              <div>{v.address.split("&")[0]}</div>
            </div>
            <div>{`[${v.category}] ${v.name}`}</div>
            <div>{v.price}원</div>
          </div>
        </Link>
      </Item>
    );
  }, []);

  const loadingList = Array.from(new Array(8)).map(() => {
    return (
      <Item>
        <a>
          <div className="img">
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={300}
              sx={{ borderRadius: "12px", width: "100%" }}
            />
          </div>
          <div className="info">
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ marginTop: "18px" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ marginTop: "18px" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ marginTop: "18px" }}
            />
          </div>
        </a>
      </Item>
    );
  });

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
        <div onClick={() => requestProductData("rating")}>평점순</div>
        <div onClick={() => requestProductData("sold")}>판매순</div>
        <div onClick={() => requestProductData("low")}>낮은 가격순</div>
        <div onClick={() => requestProductData("high")}>높은 가격순</div>
      </Nav>
      <List>{!loading ? productList : loadingList}</List>
    </Container>
  );
};

export default Category;
