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
  RouteContainer,
} from "./styles";
import { useCookies } from "react-cookie";
import qs from "qs";

import axios from "axios";
import Calendar from "./calendar";
import Detail from "./detail";
import Review from "./review";
import Qna from "./qna";

const Product = (props) => {
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

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [type, setType] = useState(0);
  const [productData, setProductData] = useState({});
  const [scheduleData, setScheduleData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [personnel, setPersonnel] = useState(1);
  const [isOpend, setIsOpend] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});

  const [content, setContent] = useState("detail");

  const selectRef = React.createRef();

  useEffect(() => {
    requestProductData();
    requestType();
  }, []);

  const requestType = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/auth/type",
        {},
        { headers: { token: cookies.token } }
      );
      setType(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/product?id=${query.id}&today=${todayYmd}`
      );
      setProductData(response.data);
      setScheduleData(response.data.schedules);
      console.log(response.data.schedules);
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
          <div className="title">{productData.name}</div>
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

      <Nav>
        <div onClick={() => setContent("detail")}>상세정보</div>
        <div onClick={() => setContent("review")}>리뷰</div>
        <div onClick={() => setContent("qna")}>Q&A</div>
      </Nav>

      <RouteContainer>
        {content === "detail" ? (
          <Detail
            productId={productData.name}
            detailArray={productData.detail}
            address={productData.address}
          />
        ) : content === "review" ? (
          <Review productId={productData.id} />
        ) : (
          <Qna
            productId={productData.id}
            sellerId={productData.sellerId}
            type={type}
          />
        )}
      </RouteContainer>
    </Container>
  );
};

export default Product;
