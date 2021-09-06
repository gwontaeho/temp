import React, { useCallback, useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";

import { Container, Item } from "./styles";

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
      <Item>
        <Rating name="read-only" value={v.rating} readOnly />
        <div>{v.text}</div>
        <div>
          {new Date(v.createdAt).getFullYear() +
            " / " +
            (new Date(v.createdAt).getMonth() + 1) +
            " / " +
            new Date(v.createdAt).getDate()}
        </div>
      </Item>
    );
  });

  return <Container>{reviewList}</Container>;
};

export default Review;
