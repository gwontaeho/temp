import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;

  .title {
    line-height: 72px;
    height: 72px;
    border-bottom: 1px solid lightgray;
  }
`;

export const Info = styled.div`
  display: flex;
  margin-bottom: 24px;

  img {
    width: 360px;
    height: 240px;
    object-fit: cover;
    border-radius: 12px;
  }

  & > div {
    padding-left: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .title {
    margin-bottom: 24px;
  }

  .text {
    display: flex;
    align-items: center;
    height: 36px;

    & div {
      width: 72px;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    height: 36px;
    div {
      cursor: pointer;
      color: gray;
      margin-right: 12px;
    }
  }
`;

export const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;

  .scheduleContainer {
    display: flex;
    height: 360px;
    margin-bottom: 24px;
  }

  .calendar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 360px;
    padding: 0 12px 0 12px;
    height: 100%;
    border: 1px solid lightgray;
    border-radius: 12px;
    margin-right: 24px;
  }

  .scheduleList {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
  }

  .clickedDate {
    width: 100%;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .schedule {
    width: 100%;
    display: flex;
    height: 36px;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
    margin-bottom: 2px;
  }
`;

export const AddSchedule = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  border: 1px solid black;
  width: 100%;

  input,
  select {
    width: 72px;
    height: 36px;
  }

  button {
    height: 36px;
    border: 0;
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .details {
    width: 100%;
  }

  .detail {
    display: flex;
    flex-direction: column;
  }

  .detailTitle {
    height: 72px;
    line-height: 72px;
    font-size: 1.8rem;
  }

  .detailText {
    font-size: 1.2rem;
  }
`;
