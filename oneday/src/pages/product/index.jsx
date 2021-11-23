import React, { useCallback, useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import qs from "qs";
import axios from "axios";
import {
  AccessTimeOutlined,
  LocationOnOutlined,
  CategoryOutlined,
  AddBoxOutlined,
  IndeterminateCheckBoxOutlined,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Profile from "../../images/profile/profile.png";

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
  Nav,
  Box,
  Routes,
} from "./styles";
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
  const [qnaData, setQnaData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

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
      setProductData(response.data);
      setScheduleData(response.data.schedules);
      requestQnaData(response.data.id);
      requestReviewData(response.data.id);
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

  const requestQnaData = useCallback(async (productId) => {
    try {
      const response = await axios.get(`/api/qna?productId=${productId}`);
      setQnaData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestReviewData = useCallback(async (productId) => {
    try {
      const response = await axios.get(`/api/review/${productId}`);
      setReviewData(response.data);
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
          <div className="name">{productData.name}</div>
          <div className="introduce">
            <img
              src={
                productData.seller.img === null ||
                productData.seller.img === "null"
                  ? Profile
                  : productData.seller.img
                      .replace(/\\/gi, "/")
                      .replace(/public/gi, "")
              }
            />
            <div>
              <div className="company">{productData.seller.company}</div>
              <div>{productData.seller.introduce}</div>
            </div>
          </div>
          <div className="info">
            <div className="rating">
              <Rating name="read-only" value={rating} readOnly />
            </div>
            <div>
              <LocationOnOutlined />
              <div>{productData.address.split("&")[0]}</div>
            </div>
            <div>
              <CategoryOutlined />
              <div>{productData.category}</div>
            </div>
            <div>
              <AccessTimeOutlined />
              <div>{productData.time} 분</div>
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
                  : `${String(selectedSchedule.ymd).substr(0, 4)}. ${String(
                      selectedSchedule.ymd
                    ).substr(4, 2)}. ${String(selectedSchedule.ymd).substr(
                      6,
                      2
                    )} / ${selectedSchedule.start.substr(
                      0,
                      2
                    )}:${selectedSchedule.start.substr(
                      2,
                      2
                    )} ~ ${selectedSchedule.end.substr(
                      0,
                      2
                    )}:${selectedSchedule.end.substr(2, 2)}`}
              </Title>
              <List>{scheduleList}</List>
            </Select>
          </SelectBox>

          <Personnel>
            <div className="buttons">
              <IconButton onClick={onClickDec}>
                <IndeterminateCheckBoxOutlined fontSize="large" />
              </IconButton>
              <div>{personnel}</div>
              <IconButton onClick={onClickInc}>
                <AddBoxOutlined fontSize="large" />
              </IconButton>
            </div>
            <div>{Number(productData.price) * personnel}원</div>
          </Personnel>

          <Button variant="contained" onClick={onClickApply}>
            신청하기
          </Button>
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
            <Tabs value={content} onChange={(e, v) => setContent(v)}>
              <Tab label="리뷰" value={0} />
              <Tab label="문의" value={1} />
            </Tabs>
          </Nav>
          {content === 0 ? (
            <Review reviewData={reviewData} />
          ) : (
            <Qna
              productId={productData.id}
              sellerId={productData.sellerId}
              company={productData.seller.company}
              qnaData={qnaData}
              requestQnaData={requestQnaData}
            />
          )}
        </Routes>
      </Box>
    </Container>
  );
};

export default Product;
