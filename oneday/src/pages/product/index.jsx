import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Info,
  Image,
  Schedule,
  SelectBox,
  Select,
  Title,
  List,
  ListItem,
  Personnel,
  ApplyButton,
  Nav,
  Box,
  Routes,
} from "./styles";
import Rating from "@material-ui/lab/Rating";

import { useSelector } from "react-redux";
import qs from "qs";

import axios from "axios";
import Calendar from "./calendar";
import Detail from "./detail";
import Review from "./review";
import Qna from "./qna";

const Product = (props) => {
  const auth = useSelector((state) => state.auth);
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const today = new Date();
  const todayYmd =
    String(today.getFullYear()) +
    String(
      today.getMonth() + 1 < 10
        ? "0" + String(today.getMonth() + 1)
        : String(today.getMonth() + 1)
    ) +
    String(
      today.getDate() + 1 < 10
        ? "0" + String(today.getDate())
        : String(today.getDate())
    );

  const [productData, setProductData] = useState({});
  const [scheduleData, setScheduleData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [personnel, setPersonnel] = useState(1);
  const [isOpend, setIsOpend] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [rating, setRating] = useState(0);

  const [content, setContent] = useState(0);

  const selectRef = React.createRef();

  useEffect(() => {
    requestProductData();
    requestRating();
  }, []);

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/product/${query.id}?&today=${todayYmd}`
      );
      console.log(response.data);
      setProductData(response.data);
      setScheduleData(response.data.schedules);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestRating = useCallback(async () => {
    try {
      const response = await axios.get(`/api/review/rating/${query.id}`);
      setRating(Number(response.data.rating));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onChangeDate = useCallback(
    (v) => {
      let newSchedules = [];
      scheduleData.forEach((schedule) => {
        if (String(schedule.ymd) === v) newSchedules.push(schedule);
      });
      const maxHeight = newSchedules.length * 48 + 72;
      if (isOpend) {
        selectRef.current.style.maxHeight = `${maxHeight}px`;
        selectRef.current.style.height = `${maxHeight}px`;
      }
      setSchedules(newSchedules);
    },
    [scheduleData, selectRef, isOpend]
  );

  const onClickDec = useCallback(() => {
    if (personnel > 1) setPersonnel(personnel - 1);
  }, [personnel]);

  const onClickInc = useCallback(() => {
    if (
      selectedSchedule.personnel - (selectedSchedule.reserved + personnel) >=
      1
    )
      setPersonnel(personnel + 1);
  }, [personnel, selectedSchedule]);

  const toggle = useCallback(() => {
    if (schedules.length === 0) return;
    const maxHeight = schedules.length * 48 + 72;
    if (isOpend) {
      selectRef.current.style.maxHeight = "72px";
      selectRef.current.style.height = "72px";
    } else {
      selectRef.current.style.maxHeight = `${maxHeight}px`;
      selectRef.current.style.height = `${maxHeight}px`;
    }
    setIsOpend(!isOpend);
  }, [isOpend, selectRef, schedules]);

  const onClickApply = useCallback(() => {
    if (auth.type === 0)
      return window.alert("회원가입 후 신청하실 수 있습니다");
    if (auth.type === 2) return window.alert("판매자는 신청할 수 없습니다");
    if (Object.keys(selectedSchedule).length !== 0) {
      props.history.push({
        pathname: "/reservation",
        state: { productData, schedule: selectedSchedule, personnel },
      });
    } else {
      window.alert("일정을 선택해주세요.");
    }
  }, [productData, selectedSchedule, personnel]);

  const scheduleList = schedules.map((v) => {
    return (
      <ListItem
        key={v.id}
        onClick={() => {
          if (v.personnel > v.reserved && v.state === 0) setSelectedSchedule(v);
        }}
        style={{
          color: v.personnel <= v.reserved || v.state === 1 ? "lightgray" : "",
        }}
      >
        {v.start.substr(0, 2) +
          ":" +
          v.start.substr(2, 2) +
          " ~ " +
          v.end.substr(0, 2) +
          ":" +
          v.end.substr(2, 2) +
          " [" +
          v.reserved +
          " / " +
          v.personnel +
          "]"}
      </ListItem>
    );
  });

  return Object.keys(productData).length === 0 ? null : (
    <Container>
      <Info>
        <Image>
          <img
            src={productData.img.replace(/\\/gi, "/").replace(/public/gi, "")}
          />
          <div className="title">
            <div className="rating">
              <Rating name="read-only" value={rating} readOnly size="large" />
            </div>
            <div className="name">
              [
              {productData.category === "flower"
                ? "플라워"
                : productData.category === "art"
                ? "미술"
                : productData.category === "cooking"
                ? "요리"
                : productData.category === "hadmade"
                ? "수공예"
                : productData.category === "activity"
                ? "액티비티"
                : "기타"}
              ] {productData.name}
            </div>
          </div>
        </Image>
        <Schedule>
          <Calendar
            scheduleData={productData.schedules}
            onChangeDate={onChangeDate}
          />
          <SelectBox>
            <Select ref={selectRef} onClick={toggle}>
              <Title>
                {Object.keys(selectedSchedule).length === 0
                  ? "일정을 선택해주세요"
                  : selectedSchedule.id}
              </Title>
              <List>{scheduleList}</List>
            </Select>
          </SelectBox>
          <Personnel>
            <div className="selectNumber">
              <div className="selectNumberButton" onClick={onClickDec}>
                -
              </div>
              <div>{personnel}</div>
              <div className="selectNumberButton" onClick={onClickInc}>
                +
              </div>
            </div>
            <div>{Number(productData.price) * personnel}원</div>
          </Personnel>
          <ApplyButton onClick={onClickApply}>신청하기</ApplyButton>
        </Schedule>
      </Info>

      <Box>
        <Detail
          productName={productData.name}
          detailArray={productData.detail}
          address={productData.address}
        />
        <Routes>
          <Nav>
            <div onClick={() => setContent(0)}>리뷰</div>
            <div onClick={() => setContent(1)}>Q&A</div>
          </Nav>
          {content === 0 ? (
            <Review productId={productData.id} />
          ) : (
            <Qna
              productId={productData.id}
              company={productData.seller.company}
              type={auth.type}
            />
          )}
        </Routes>
      </Box>
    </Container>
  );
};

export default Product;
