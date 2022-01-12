import { useCallback, useState } from "react";
import {
  Container,
  Header,
  Time,
  AddDetail,
  DetailsList,
  DetailsItem,
  PageControls,
} from "./styles";

const SecondPage = ({
  exercise,
  movePage,
  time,
  setTime,
  details,
  setDetails,
  addRecord,
}) => {
  const [detailName, setDetailName] = useState("");
  const [detailWeight, setDetailWeight] = useState("");
  const [detailReps, setDetailReps] = useState("");
  const [detailSets, setDetailSets] = useState("");

  const onClickAddDetail = useCallback(() => {
    setDetails([
      ...details,
      {
        key: new Date().getTime(),
        name: detailName,
        weight: detailWeight,
        reps: detailReps,
        sets: detailSets,
      },
    ]);
    setDetailName("");
    setDetailWeight("");
    setDetailReps("");
    setDetailSets("");
  }, [details, detailName, detailWeight, detailReps, detailSets]);

  const removeDetail = useCallback(
    (detail) => {
      const newDetails = [...details];
      const index = newDetails.findIndex(
        (element) => element.name === detail.name
      );
      newDetails.splice(index, 1);
      setDetails(newDetails);
    },
    [details]
  );

  const onClickFinish = useCallback(() => {
    setDetailName("");
    setDetailWeight("");
    setDetailReps("");
    setDetailSets("");
    addRecord();
  }, [addRecord]);

  const detailsList = details.map((detail) => {
    return (
      <DetailsItem key={detail.key}>
        <div>{`${detail.name} ${detail.weight}kg ${detail.reps} X ${detail.sets}`}</div>
        <div className="remove-button" onClick={() => removeDetail(detail)}>
          삭제
        </div>
      </DetailsItem>
    );
  });

  return (
    <Container>
      <Header>{exercise}</Header>
      <Time>
        <div>운동한 시간</div>
        <input
          type="text"
          maxLength="3"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <div>분</div>
      </Time>
      <AddDetail>
        <div>세부운동 추가</div>
        <input
          className="input-detail-name"
          placeholder="운동 이름"
          type="text"
          value={detailName}
          onChange={(e) => setDetailName(e.target.value)}
        />
        <input
          type="text"
          maxLength="3"
          placeholder="KG"
          value={detailWeight}
          onChange={(e) => setDetailWeight(e.target.value)}
        />
        <input
          type="text"
          maxLength="2"
          placeholder="REPS"
          value={detailReps}
          onChange={(e) => setDetailReps(e.target.value)}
        />

        <input
          type="text"
          maxLength="2"
          placeholder="SETS"
          value={detailSets}
          onChange={(e) => setDetailSets(e.target.value)}
        />
        <div className="add-button" onClick={onClickAddDetail}>
          추가
        </div>
      </AddDetail>

      <DetailsList>{detailsList}</DetailsList>
      <PageControls>
        <div onClick={() => movePage(0)}>이전</div>
        <div onClick={onClickFinish}>완료</div>
      </PageControls>
    </Container>
  );
};

export default SecondPage;
