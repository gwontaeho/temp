import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { Main, Header, List, Item } from "./styles.js";
import alt from "../../image/alt.png";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [location]);

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.post("/api/product/search", {
        keyword: location.state,
      });
      setCount(response.data.count);
      setProducts(response.data.rows);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [location]);

  const onError = useCallback((e) => {
    e.target.src = alt;
  }, []);

  const productList = products.map((product) => {
    const src =
      JSON.parse(product.img).length === 0 || !product.img
        ? alt
        : JSON.parse(product.img)[0]
            .replace(/\\/gi, "/")
            .replace(/public/gi, "");

    return (
      <Item key={product.id}>
        <img
          src={src}
          alt={product.name}
          onError={onError}
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <div className="name">{product.name}</div>
        <div className="price">{Number(product.price).toLocaleString()}원</div>
        <div>{product.address}</div>
        <div className="info">
          관심{product.wishes} · 댓글{product.comments}
        </div>
      </Item>
    );
  });

  return (
    <Main>
      <Header>
        {!location.state
          ? "전체 검색 결과입니다"
          : `"${location.state}" 검색 결과입니다`}
      </Header>
      <List>{productList}</List>
    </Main>
  );
};

export default Search;
