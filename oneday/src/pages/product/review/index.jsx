import React, { useCallback, useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";

import { Container, Header, ReviewItem, ReviewList } from "./styles";

import axios from "axios";

const Review = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/review/get", {
          classId: props.classId,
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const reviewList = data.map((v) => {
    return (
      <ReviewItem>
        <Rating name="read-only" value={v.rating} readOnly />
        <div className="id">
          <div>{v.userId}</div>
          <div>
            {new Date(v.createdAt).getFullYear() +
              " / " +
              (new Date(v.createdAt).getMonth() + 1) +
              " / " +
              new Date(v.createdAt).getDate()}
          </div>
        </div>
        <div>{v.text}</div>
      </ReviewItem>
    );
  });

  return (
    <Container>
      <Header>
        <div>클래스 리뷰 (총 {data.length}건)</div>
      </Header>
      <ReviewList>{reviewList}</ReviewList>
    </Container>
  );
};

export default Review;
