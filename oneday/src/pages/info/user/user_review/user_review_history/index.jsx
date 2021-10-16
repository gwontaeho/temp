import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";

import { Container, Header, List, Item } from "./styles";

const UserReviewHistory = () => {
  const auth = useSelector((state) => state.auth);

  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    requestReviewData();
  }, []);

  const requestReviewData = useCallback(async () => {
    try {
      const response = await axios.get("/api/review", {
        headers: { token: auth.token },
      });
      console.log(response.data);
      setReviewData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const reviewList = reviewData.map((v) => {
    return (
      <Item key={v.id}>
        <div className="info">
          <img
            src={v.product.img.replace(/\\/gi, "/").replace(/public/gi, "")}
          />
          <div>
            <div>
              [
              {v.product.category === "flower"
                ? "플라워"
                : v.product.category === "art"
                ? "미술"
                : v.product.category === "cooking"
                ? "요리"
                : v.product.category === "handmade"
                ? "수공예"
                : v.product.category === "activity"
                ? "액티비티"
                : "기타"}
              ]
            </div>
            <div>{v.product.name}</div>
          </div>
        </div>
        <div className="review">
          <div>
            <Rating name="read-only" value={v.rating} readOnly />
          </div>
          <div>{v.text}</div>
        </div>
        <div className="text">{`${v.createdAt.substr(
          0,
          4
        )}. ${v.createdAt.substr(5, 2)}. ${v.createdAt.substr(8, 2)}`}</div>
        <div className="text">
          <Link to={`/info/reservation/${v.reservationId}`}>자세히</Link>
        </div>
      </Item>
    );
  });

  return (
    <Container>
      <Header>
        <div>클래스 정보</div>
        <div>후기</div>
        <div>작성일</div>
      </Header>
      <List>{reviewList}</List>
    </Container>
  );
};

export default UserReviewHistory;
