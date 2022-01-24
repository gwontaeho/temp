import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import Pagination from "@mui/material/Pagination";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { start, end } from "../../features/loading";
import { Main, Header, Controls, Text, List, Item } from "./styles";

import alt from "../../image/alt.png";

const Sale = () => {
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [state, setState] = useState(0);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, [page, state]);

  const getProduct = useCallback(async () => {
    try {
      dispatch(start());
      const response = await axiosInstance.get(
        `/api/product/sale?page=${page}&state=${state}`,
        {
          headers: {
            token: auth.token,
          },
        }
      );
      setPages(Math.ceil(response.data.count / 6));
      setCount(response.data.count);
      setProducts(response.data.rows);
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, [page, state]);

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
        {product.unanswered ? (
          <div className="unanswered">
            미답변 댓글이 {product.unanswered}건 있습니다
          </div>
        ) : null}
      </Item>
    );
  });

  return (
    <Main>
      <Header>
        {!loading.current &&
          (state === 0
            ? count === 0
              ? `판매중인 상품이 없습니다`
              : `${count}건의 판매중인 상품이 있습니다`
            : count === 0
            ? `판매완료된 상품이 없습니다`
            : `${count}건의 판매완료된 상품이 있습니다`)}
      </Header>
      <Controls>
        <div>
          <ButtonGroup>
            <Button
              variant={!state ? "contained" : "outlined"}
              size="large"
              onClick={() => {
                setPage(1);
                setState(0);
              }}
            >
              판매 중
            </Button>
            <Button
              variant={state ? "contained" : "outlined"}
              size="large"
              onClick={() => {
                setPage(1);
                setState(1);
              }}
            >
              판매 완료
            </Button>
          </ButtonGroup>
        </div>
        <Pagination page={page} count={pages} onChange={(e, v) => setPage(v)} />
      </Controls>
      {count === 0 && (
        <Text onClick={() => navigate("/write")}>상품 등록하러가기</Text>
      )}
      <List>{productList}</List>
    </Main>
  );
};

export default Sale;
