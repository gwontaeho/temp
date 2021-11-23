import React from "react";
import Rating from "@material-ui/lab/Rating";
import Profile from "../../../images/profile/profile.png";

import { Container, Header, List, Item } from "./styles";

const Review = (props) => {
  const reviewList = props.reviewData.map((v) => {
    return (
      <Item key={v.id}>
        <img
          src={
            v.user.img === null
              ? Profile
              : v.user.img.replace(/\\/gi, "/").replace(/public/gi, "")
          }
        />
        <div>
          <Rating name="read-only" value={v.rating} readOnly />
          <div>{v.userId}</div>
          <div>
            {new Date(v.createdAt).getFullYear() +
              " / " +
              (new Date(v.createdAt).getMonth() + 1) +
              " / " +
              new Date(v.createdAt).getDate()}
          </div>
        </div>
        <div className="text">{v.text}</div>
      </Item>
    );
  });

  return (
    <Container>
      <Header>
        <div>클래스 리뷰 (총 {props.reviewData.length}건)</div>
      </Header>
      <List>{reviewList}</List>
    </Container>
  );
};

export default Review;
