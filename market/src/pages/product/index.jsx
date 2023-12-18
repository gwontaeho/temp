import { useState, useCallback, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axios";
import Slider from "react-slick";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { start, end } from "../../features/loading";

import {
  Container,
  Article,
  SoldTag,
  Img,
  Controls,
  Wish,
  Text,
  Seller,
  Comment,
  CommentItem,
  Question,
  Answer,
  StyledModal,
} from "./styles";
import alt from "../../image/alt.png";

const Product = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [fetch, setFetch] = useState(false);
  const [open, setOpen] = useState(false);

  const [product, setProduct] = useState({});
  const [imgs, setImgs] = useState([]);
  const [wish, setWish] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [buyer, setBuyer] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = useCallback(async () => {
    try {
      dispatch(start());
      const response = await axiosInstance.get(`/api/product/${params.id}`);
      if (response.status === 200) {
        let users = [];
        response.data.comments.forEach((comment) => {
          const user = {
            id: comment.user.id,
            nickname: comment.user.nickname,
            img: comment.user.img,
          };
          const found = users.find((v) => v.id === user.id);
          if (found === undefined) users.push(user);
        });
        response.data.wishes.forEach((wish) => {
          const user = {
            id: wish.user.id,
            nickname: wish.user.nickname,
            img: wish.user.img,
          };
          const found = users.find((v) => v.id === user.id);
          if (found === undefined) users.push(user);
        });
        setProduct(response.data);
        setImgs(JSON.parse(response.data.img));
        if (auth.loggedIn) {
          const isWish = response.data.wishes.filter(
            (wish) => wish.userId === auth.id
          );
          if (isWish.length === 0) setWish(false);
          else setWish(true);
        }
        setComments(response.data.comments);
        setUsers(users);
        setFetch(true);
      }
    } catch (error) {
      return navigate("/", { replace: true });
    }
    dispatch(end());
  }, []);

  const postWish = useCallback(async () => {
    if (!auth.loggedIn) return window.alert("로그인을 해주세요");
    try {
      dispatch(start());
      const response = await axiosInstance.post(
        "/api/wish",
        {
          productId: product.id,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) getProduct();
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, [product]);

  const postComment = useCallback(async () => {
    if (!auth.loggedIn) return window.alert("로그인을 해주세요");
    if (comment === "") return window.alert("내용을 입력해주세요");
    try {
      dispatch(start());
      const response = await axiosInstance.post(
        `/api/comment`,
        {
          productId: params.id,
          comment,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) {
        setComment("");
        getProduct();
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, [comment]);

  const putComment = useCallback(async (e, id) => {
    const parentNode = e.target.parentNode;
    const answer = e.target.parentNode.getElementsByTagName("input")[0].value;
    try {
      dispatch(start());
      const response = await axiosInstance.put(
        "/api/comment",
        {
          id,
          answer,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) getProduct();
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
    parentNode.style.display = "none";
  }, []);

  const putProduct = useCallback(async () => {
    try {
      dispatch(start());
      const response = await axiosInstance.put(
        "/api/product/1",
        {
          id: params.id,
          buyer: buyer,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) getProduct();
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, [buyer]);

  const onClickReply = useCallback((e) => {
    if (e.target.nextSibling.style.display === "flex")
      e.target.nextSibling.style.display = "none";
    else e.target.nextSibling.style.display = "flex";
  }, []);

  const imglist = imgs.map((img) => {
    return (
      <Img key={img}>
        <img src={img} alt="img" onError={(e) => (e.target.src = alt)} />
      </Img>
    );
  });

  const commentList = comments.map((comment) => {
    const userProfileImg = comment.user.img ? comment.user.img : alt;
    const sellerProfileImg = product.user.img ? product.user.img : alt;
    if (comment.userId === auth.id || product.userId === auth.id)
      return (
        <CommentItem key={comment.id}>
          <Question>
            <img
              src={userProfileImg}
              alt="profile"
              onError={(e) => (e.target.src = alt)}
            />
            <div>
              <div className="nickname">{comment.user.nickname}</div>
              <div className="date">{comment.createdAt.substr(0, 10)}</div>
              <div className="text">{comment.comment}</div>
              {product.userId === auth.id && comment.answer === null && (
                <>
                  <div className="reply" onClick={onClickReply}>
                    답글
                  </div>
                  <div className="reply-write">
                    <TextField variant="standard" fullWidth />
                    <Button
                      variant="text"
                      onClick={(e) => putComment(e, comment.id)}
                    >
                      작성
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Question>
          {comment.answer !== null && (
            <Answer>
              <img
                src={sellerProfileImg}
                alt="profile"
                onError={(e) => (e.target.src = alt)}
              />
              <div>
                <div className="nickname">{product.user.nickname}</div>
                <div className="date">{comment.updatedAt.substr(0, 10)}</div>
                <div className="text">{comment.answer}</div>
              </div>
            </Answer>
          )}
        </CommentItem>
      );
  });

  const userList = users.map((user) => {
    const src = user.img ? user.img : alt;
    return (
      <div key={user.id} className="item">
        <div className="profile">
          <img src={src} alt="img" onError={(e) => (e.target.src = alt)} />
          <div>{user.nickname}</div>
        </div>
        <Radio
          value={user.id}
          checked={buyer === user.id}
          onChange={(e) => setBuyer(e.target.value)}
        />
      </div>
    );
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    fetch && (
      <Container>
        <StyledModal open={open} onClose={() => setOpen(false)}>
          <div className="container">
            <div className="header">구매자 목록</div>
            <div className="list">{userList}</div>
            <div className="item">
              <div>목록에 없는 사용자</div>
              <Radio
                value=""
                checked={buyer === ""}
                onChange={(e) => setBuyer(e.target.value)}
              />
            </div>
            <div className="button">
              <Button
                variant="contained"
                onClick={() => {
                  putProduct();
                  setOpen(false);
                }}
                size="large"
              >
                판매 종료하기
              </Button>
              <Button
                variant="text"
                onClick={() => setOpen(false)}
                size="large"
              >
                취소
              </Button>
            </div>
          </div>
        </StyledModal>

        <Article>
          {(product.state === "1" || product.state === "2") && (
            <SoldTag>판매 완료</SoldTag>
          )}

          <Slider {...settings}>{imglist}</Slider>

          {product.userId === auth.id && (
            <Controls>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                size="large"
                disabled={product.state !== "0"}
              >
                판매 종료하기
              </Button>
              <Link to={`/update/${product.id}`}>글 수정</Link>
            </Controls>
          )}

          <Wish>
            <div>{`관심 ${product.wishes.length} · 댓글 ${product.comments.length}`}</div>
            {product.userId !== auth.id && (
              <div className="icon" onClick={postWish}>
                {wish ? (
                  <Favorite fontSize="large" color="primary" />
                ) : (
                  <FavoriteBorder fontSize="large" color="primary" />
                )}
              </div>
            )}
          </Wish>

          <Text>
            <div className="address">{product.address}</div>
            <div className="date">{product.createdAt.substr(0, 10)}</div>
            <div className="name">{product.name}</div>
            <div className="price">
              {Number(product.price).toLocaleString()}원
            </div>
            <pre className="intro">{product.intro}</pre>
          </Text>

          <Seller>
            <div className="profile">
              <img
                src={
                  product.user.img
                    ? product.user.img
                        .replace(/\\/gi, "/")
                        .replace(/public/gi, "")
                    : alt
                }
                alt="profile"
              />
              <div>{product.user.nickname}</div>
            </div>
            <Link to={`/user/${product.user.id}`}>판매 상품 더 보기</Link>
          </Seller>

          <Comment>
            <div className="title">
              {product.userId === auth.id
                ? comments.length === 0
                  ? "작성된 댓글이 없습니다"
                  : `${comments.length}개의 댓글`
                : product.state === "0"
                ? "판매자에게 댓글로 문의해보세요"
                : " 판매완료된 상품에는 댓글을 달 수 없습니다"}
            </div>
            {product.state === "0" && (
              <div className="write">
                <TextField
                  variant="standard"
                  fullWidth
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="text" onClick={postComment}>
                  작성
                </Button>
              </div>
            )}
            <div className="list">{commentList}</div>
          </Comment>
        </Article>
      </Container>
    )
  );
};

export default Product;
