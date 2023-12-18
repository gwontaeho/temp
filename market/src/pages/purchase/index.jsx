import { useState, useCallback, useEffect } from "react";
import axiosInstance from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { start, end } from "../../features/loading";
import { Main, Header, Controls, List, Text, Item } from "./styles";
import alt from "../../image/alt.png";

const Purchase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [page2, setPage2] = useState(1);
  const [pages2, setPages2] = useState(1);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [uncertain, setUncertain] = useState([]);

  useEffect(() => {
    getProduct();
  }, [page]);

  useEffect(() => {
    getProduct2();
  }, [page2]);

  const getProduct = useCallback(async () => {
    try {
      dispatch(start());
      const response = await axiosInstance.get(
        `/api/product/purchase?state=2&page=${page}`,
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) {
        setPages(Math.ceil(response.data.count / 6));
        setCount(response.data.count);
        setProducts(response.data.rows);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, [page]);

  const getProduct2 = useCallback(async () => {
    try {
      dispatch(start());
      const response = await axiosInstance.get(
        `/api/product/uncertain?state=1&page=${page2}`,
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) {
        setPages2(Math.ceil(response.data.count / 3));
        setUncertain(response.data.rows);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, [page2]);

  const putProduct = useCallback(async (id, boolean) => {
    try {
      dispatch(start());
      const response = await axiosInstance.put(
        "/api/product/2",
        {
          id,
          boolean,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) {
        getProduct();
        getProduct2();
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, []);

  const productList = products.map((product) => {
    const src =
      JSON.parse(product.img).length === 0 || !product.img
        ? alt
        : JSON.parse(product.img)[0];

    return (
      <Item key={product.id}>
        <img
          src={src}
          alt={product.name}
          onError={(e) => (e.target.src = alt)}
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

  const uncertainList = uncertain.map((product) => {
    const src =
      JSON.parse(product.img).length === 0 || !product.img
        ? alt
        : JSON.parse(product.img)[0];

    return (
      <Item key={product.id}>
        <img
          src={src}
          alt={product.name}
          onError={(e) => (e.target.src = alt)}
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <div className="name">{product.name}</div>
        <div className="buttons">
          <Button
            variant="outlined"
            onClick={() => putProduct(product.id, true)}
          >
            네 맞아요
          </Button>
          <Button variant="text" onClick={() => putProduct(product.id, false)}>
            아니요
          </Button>
        </div>
      </Item>
    );
  });

  return (
    <Main>
      <Header>
        {!loading.current &&
          (count === 0
            ? `아직 구매한 상품이 없습니다`
            : `${count}건의 구매한 상품이 있습니다`)}
      </Header>
      <Controls>
        <Pagination page={page} count={pages} onChange={(e, v) => setPage(v)} />
      </Controls>
      {count === 0 && <Text></Text>}
      <List>{productList}</List>
      <Header>구매한 상품이 맞나요?</Header>
      <Controls>
        <Pagination
          page={page2}
          count={pages2}
          onChange={(e, v) => setPage2(v)}
        />
      </Controls>
      <List>{uncertainList}</List>
    </Main>
  );
};

export default Purchase;
