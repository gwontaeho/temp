import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 24px;
`;

export const Info = styled.div`
  display: flex;
  margin-bottom: 24px;

  img {
    width: 360px;
    height: 360px;
    object-fit: cover;
    margin-right: 24px;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .info {
    > div {
      display: flex;
      > div {
        display: flex;
        align-items: center;
      }
    }
    .title {
      height: 60px;
      width: 120px;
    }
    .address {
      flex: 1;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    height: 60px;
    div {
      cursor: pointer;
      color: gray;
    }
  }
`;

export const Schedule = styled.div`
  display: flex;
  width: 100%;
  height: 360px;
  margin-bottom: 24px;

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
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    > div:not(:last-child) {
      padding-right: 36px;
    }
  }

  .schedule {
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
    margin-bottom: 2px;

    .item {
      display: flex;
      > div {
        padding-right: 36px;
      }
    }
  }
`;

export const AddSchedule = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  width: calc(100% - 24px);
  padding-left: 24px;
  margin-bottom: 24px;

  > div {
    padding-right: 24px;
  }

  input,
  select {
    width: 72px;
    height: 36px;
    border: 1px solid lightgray;
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
