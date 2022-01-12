import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setDate } from "../../redux/date/actions";
import { setScreen } from "../../redux/screen/actions";

import {
  Container,
  Header,
  Controls,
  Text,
  RecordsList,
  RecordsItem,
} from "./styles";

const Board = () => {
  const dispatch = useDispatch();

  const date = useSelector((state) => state.date);
  const screen = useSelector((state) => state.screen);

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const newRecords =
      JSON.parse(
        window.localStorage.getItem(date.current.toLocaleDateString())
      ) || [];
    setRecords(newRecords);
  }, [date, screen]);

  const expandRecord = useCallback((e) => {
    const rotate = e.currentTarget.getElementsByClassName("rotate")[0];
    const recordDetails =
      e.currentTarget.parentNode.parentNode.getElementsByClassName(
        "record-details"
      )[0];

    if (recordDetails.style.maxHeight) {
      recordDetails.style.maxHeight = "";
      rotate.style.transform = "rotate(90deg)";
      rotate.style.opacity = "1";
    } else {
      recordDetails.style.maxHeight = `${
        recordDetails.getElementsByClassName("record-detail").length * 50
      }px`;
      rotate.style.transform = "rotate(180deg)";
      rotate.style.opacity = "0";
    }
  }, []);

  const removeRecord = useCallback(
    (key) => {
      const newRecords = [...records];
      const index = newRecords.findIndex((element) => element.key === key);
      if (index === -1) return;

      newRecords.splice(index, 1);
      if (newRecords.length === 0) {
        window.localStorage.removeItem(date.current.toLocaleDateString());
      } else {
        window.localStorage.setItem(
          date.current.toLocaleDateString(),
          JSON.stringify(newRecords)
        );
      }
      dispatch(setDate(new Date(date.current)));
    },
    [date, records]
  );

  const recordsList = records.map((record) => {
    const className = record.details.length
      ? "expand-button available"
      : "expand-button";

    const detailsList = record.details.map((detail) => {
      return (
        <div
          className="record-detail"
          key={detail.key}
        >{`${detail.name} ${detail.weight}kg ${detail.reps} X ${detail.sets}`}</div>
      );
    });

    return (
      <RecordsItem key={record.key}>
        <div className="record">
          <div
            className={className}
            onClick={(e) => {
              if (record.details.length) expandRecord(e);
            }}
          >
            {!!record.details.length && (
              <>
                <div />
                <div className="rotate" />
              </>
            )}
          </div>
          <div>
            {record.exercise} ({record.time}분)
          </div>
          <div
            className="remove-button"
            onClick={() => removeRecord(record.key)}
          >
            <div />
          </div>
        </div>
        {!!record.details.length && (
          <div className="record-details">{detailsList}</div>
        )}
      </RecordsItem>
    );
  });

  return (
    <Container>
      <Header>{`${date.current.getFullYear()}년 ${
        date.current.getMonth() + 1
      }월 ${date.current.getDate()}일`}</Header>
      <Controls>
        <div onClick={() => dispatch(setScreen(1))}>운동 기록하기</div>
      </Controls>
      {records.length ? (
        <RecordsList>{recordsList}</RecordsList>
      ) : (
        <Text>아직 기록된 운동이 없습니다.</Text>
      )}
    </Container>
  );
};

export default Board;
