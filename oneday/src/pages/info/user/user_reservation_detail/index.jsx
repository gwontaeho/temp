import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { Container, Header, Detail, Review } from "./styles";

Modal.setAppElement("#root");

const UserReservationDetail = ({ match }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [data, setData] = useState({});
  const [isOpend, setIsOpend] = useState(false);
  const [reviewRating, setReviewRating] = useState(2);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/reservation/history/detail",
          {
            id: match.params.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        console.log(response.data);
        if (response.data.review !== null) {
          setReviewRating(response.data.review.rating);
          setReviewText(response.data.review.text);
        }
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(match.params.id);
  }, []);

  const onClickWaitingCancel = useCallback(async () => {
    const result = window.confirm("예약을 취소하시겠습니까?");

    if (result) {
      try {
        const response = await axios.post(
          "/api/reservation/waitingcancel",
          {
            reservationId: data.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        window.alert("예약이 취소 되었습니다.");
        window.location.reload();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [data]);

  const onClickCancel = useCallback(async () => {
    const result = window.confirm("예약을 취소하시겠습니까?");

    if (result) {
      try {
        const response = await axios.post(
          "/api/reservation/request",
          {
            reservationId: data.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        window.alert("예약이 취소 요청되었습니다.");
        window.location.reload();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [data]);

  const onClickWithdraw = useCallback(async () => {
    const result = window.confirm("취소요청을 철회하시겠습니까?");

    if (result) {
      try {
        const response = await axios.post(
          "/api/reservation/withdraw",
          {
            reservationId: data.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        window.alert("취소요청이 철회되었습니다.");
        window.location.reload();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [data]);

  const openModal = useCallback(() => {
    setIsOpend(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpend(false);
  }, []);

  const onChangeReviewText = useCallback((e) => {
    setReviewText(e.target.value);
    console.log(e.target.value);
    console.log(reviewRating);
  }, []);

  const onClickSave = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/review/add",
        {
          text: reviewText,
          rating: reviewRating,
          classId: data.classId,
          reservationId: data.id,
        },
        { headers: { token: cookies.token } }
      );
      console.log(response.data);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }, [reviewText, reviewRating, data]);

  const onClickModify = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/review/modify",
        {
          text: reviewText,
          rating: reviewRating,
          reviewId: data.review.id,
        },
        { headers: { token: cookies.token } }
      );
      console.log(response.data);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }, [reviewText, reviewRating, data]);

  return Object.keys(data).length === 0 ? null : (
    <Container>
      <Modal
        isOpen={isOpend}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={{
          content: {
            width: "720px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Header>
          <div>리뷰 작성</div>
          <div className="header-btns">
            {data.review === null ? (
              <div onClick={onClickSave}>저장</div>
            ) : (
              <div onClick={onClickModify}>수정</div>
            )}
            <div onClick={closeModal}>닫기</div>
          </div>
        </Header>
        <Review>
          <Rating
            name="simple-controlled"
            value={reviewRating}
            onChange={(event, newValue) => {
              console.log(newValue);
              setReviewRating(newValue);
            }}
          />
          <textarea
            maxLength="200"
            rows="5"
            value={reviewText}
            onChange={onChangeReviewText}
          />
        </Review>
      </Modal>
      <Header>예약 상세</Header>
      <Detail>
        <div className="title">
          <div>클래스 명</div>
          <div>수강 일자</div>
          <div>예약 일자</div>
          <div>수강 인원</div>
          <div>예약 인원</div>
          <div>예약 상태</div>
        </div>
        <div>
          <div>{data.class.name}</div>
          <div>
            {data.schedule.time.substring(0, 4) +
              "-" +
              data.schedule.time.substring(4, 6) +
              "-" +
              data.schedule.time.substring(6, 8) +
              " / " +
              data.schedule.time.substring(8, 10) +
              ":" +
              data.schedule.time.substring(10, 12) +
              " ~ " +
              data.schedule.time.substring(12, 14) +
              ":" +
              data.schedule.time.substring(14, 16)}
          </div>
          <div>
            {data.createdAt.substring(0, 10) +
              " / " +
              data.createdAt.substring(11, 16)}
          </div>
          <div>{data.schedule.personnel}</div>
          <div>{data.personnel}</div>
          <div>
            <div>
              {data.state === 0
                ? "예약 중"
                : data.state === 1
                ? "수강 완료"
                : data.state === 2
                ? "취소 요청"
                : data.state === 3
                ? "취소"
                : "예약 대기"}
            </div>
          </div>
        </div>
        <div className="btns">
          {data.state === 0 ? (
            <div onClick={onClickCancel}>예약 취소</div>
          ) : data.state === 1 && data.review === null ? (
            <div onClick={openModal}>리뷰 작성</div>
          ) : data.state === 1 && data.review != null ? (
            <div onClick={openModal}>리뷰 수정</div>
          ) : data.state === 2 ? (
            <div onClick={onClickWithdraw}>취소 철회</div>
          ) : data.state === 4 ? (
            <div onClick={onClickWaitingCancel}>예약 취소</div>
          ) : null}
        </div>
      </Detail>
      <Header>결제 정보</Header>
    </Container>
  );
};

export default UserReservationDetail;
