import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import { Container, Header, List, Product, Image, Info } from "./styles";

const SellerProduct = () => {
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
      <Product key={v.id}>
        <Image>
          <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
        </Image>
        <Info>
          <div>{v.name}</div>
          <div>{v.price}원</div>
          <div>{v.time}분</div>
          <div>{v.sold}</div>
          <Link to={`/info/product/${v.id}`}>자세히</Link>
        </Info>
      </Product>
    );
  });

  return (
    <Container>
      <Header>클래스 관리</Header>
      <Header>
        <Link to="/info/create">클래스 생성</Link>
      </Header>
      <List>{productList}</List>
    </Container>
  );
};

export default SellerProduct;
