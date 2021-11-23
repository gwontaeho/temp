import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { Container, Header, List, Item } from "./styles";

const SellerProduct = (props) => {
  const auth = useSelector((state) => state.auth);

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    requestProductData();
  }, []);

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.get("/api/product/seller", {
        headers: { token: auth.token },
      });
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const productList = productData.map((v) => {
    return (
      <Item key={v.id}>
        <Link to={`/info/product/${v.id}`}>
          <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
          <div>{v.name}</div>
        </Link>
      </Item>
    );
  });

  return (
    <Container>
      <Header>클래스 관리</Header>
      <Header>
        <Button
          variant="outlined"
          onClick={() => props.history.push("/info/create")}
        >
          클래스 생성
        </Button>
      </Header>
      <List>{productList}</List>
    </Container>
  );
};

export default SellerProduct;
