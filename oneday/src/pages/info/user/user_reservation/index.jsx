import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

import axios from "axios";

import {
  Container,
  Header,
  Nav,
  Condition,
  ListHeader,
  List,
  Item,
} from "./styles";

const UserReservation = (props) => {
  const auth = useSelector((state) => state.auth);

  const [reservationData, setReservationData] = useState([]);
  const [reservationCount, setReservationCount] = useState(0);
  const [state, setState] = useState(0);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState([null, null]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    requestReservationData();
  }, [state, page]);

  useEffect(() => {
    if (!checked) requestReservationData();
  }, [checked]);

  const requestReservationData = useCallback(async () => {
    console.log("조회합니다");
    try {
      const response = await axios.post(
        "/api/reservation/lookup",
        {
          state,
          value,
          checked,
          page,
        },
        {
          headers: { token: auth.token },
        }
      );
      setReservationCount(response.data.count);
      setPages(Math.ceil(response.data.count / 5));
      setReservationData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [state, value, checked, page]);

  const reservationList = reservationData.map((v) => {
    const scheduleYmd =
      String(v.schedule.ymd).substr(0, 4) +
      ". " +
      String(v.schedule.ymd).substr(4, 2) +
      ". " +
      String(v.schedule.ymd).substr(6, 2);
    const scheduleTime =
      v.schedule.start.substr(0, 2) +
      ":" +
      v.schedule.start.substr(2, 2) +
      " ~ " +
      v.schedule.end.substr(0, 2) +
      ":" +
      v.schedule.end.substr(2, 2);
    const reservationYmd =
      v.createdAt.substr(0, 4) +
      ". " +
      v.createdAt.substr(5, 2) +
      ". " +
      v.createdAt.substr(8, 2);
    return (
      <Item key={v.id}>
        <div className="info">
          <img
            src={v.product.img.replace(/\\/gi, "/").replace(/public/gi, "")}
          />
          <div>
            <div>[{v.product.category}]</div>
            <div>{v.product.name}</div>
          </div>
        </div>
        <div className="text">
          <div>{scheduleYmd}</div>
          <div>{scheduleTime}</div>
        </div>
        <div className="text">{reservationYmd}</div>
        <div className="text">{v.personnel} 명</div>
        <div className="text">
          <div>
            {v.state === 0
              ? "예약 중"
              : v.state === 1 || v.state === 5
              ? "수강 완료"
              : v.state === 2
              ? "취소 요청"
              : v.state === 3
              ? "취소"
              : "예약 대기"}
          </div>
        </div>
        <div className="text">
          <Link to={`/info/reservation/${v.id}`}>자세히</Link>
          <div>{v.state === 1 ? "후기를 작성해주세요" : null}</div>
        </div>
      </Item>
    );
  });

  return (
    <Container>
      <Header>예약 내역</Header>
      <Nav>
        <div
          onClick={() => {
            setState(4);
            setPage(1);
          }}
          className={state === 4 ? "current" : ""}
        >
          <div>예약 대기</div>
          <div>{props.reservationCountData.e}</div>
        </div>
        <div
          onClick={() => {
            setState(0);
            setPage(1);
          }}
          className={state === 0 ? "current" : ""}
        >
          <div>예약 중</div>
          <div>{props.reservationCountData.a}</div>
        </div>
        <div
          onClick={() => {
            setState(1);
            setPage(1);
          }}
          className={state === 1 ? "current" : ""}
        >
          <div>수강 완료</div>
          <div>
            {props.reservationCountData.b + props.reservationCountData.f}
          </div>
        </div>
        <div
          onClick={() => {
            setState(2);
            setPage(1);
          }}
          className={state === 2 ? "current" : ""}
        >
          <div>취소 요청</div>
          <div>{props.reservationCountData.c}</div>
        </div>
        <div
          onClick={() => {
            setState(3);
            setPage(1);
          }}
          className={state === 3 ? "current" : ""}
        >
          <div>취소</div>
          <div>{props.reservationCountData.d}</div>
        </div>
      </Nav>
      <Condition>
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              }
              label="날짜 선택"
              labelPlacement="start"
            />
          </FormGroup>
          {checked ? (
            <>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  startText=""
                  endText=""
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 1 }} />
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
              <Button variant="outlined" onClick={requestReservationData}>
                조회
              </Button>
              <div>{reservationCount} 건</div>
            </>
          ) : null}
        </div>
        <Pagination page={page} count={pages} onChange={(e, v) => setPage(v)} />
      </Condition>
      <ListHeader>
        <div>클래스 정보</div>
        <div>수강 일자</div>
        <div>예약 일자</div>
        <div>예약 인원</div>
        <div>예약 상태</div>
      </ListHeader>
      <List>{reservationList}</List>
    </Container>
  );
};

export default UserReservation;
