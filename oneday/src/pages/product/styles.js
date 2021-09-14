import styled from "@emotion/styled";

export const Container = styled.div`
  width: calc(100% - 48px);
  padding: 24px;

  .routes {
    width: 100%;
  }
`;

export const Info = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .info {
    display: flex;
    padding: 24px;
    flex-direction: column;
    justify-content: center;

    img {
      width: 100%;
      height: 420px;
      object-fit: cover;
    }
    .title {
      height: 72px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .reserve {
    padding: 24px;
    .calendar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(100% - 2px);
      border: 1px solid lightgray;
      margin-bottom: 24px;
    }
    .scheduleContainer {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .title_schedule {
      width: 100%;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid lightgray;
      margin-bottom: 24px;
    }
    .title_schedule:hover:not(:last-child) {
      cursor: pointer;
    }
    .schedules {
      width: 100%;
      position: absolute;
      background-color: white;
      border: 1px solid lightgray;
      top: 73px;
    }
    .schedule {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .schedule:hover {
      background-color: lightgray;
    }

    .number {
      width: 100%;
      height: 72px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .selectNumber {
      display: flex;
      justify-content: center;
      height: 36px;
      & > div {
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .selectNumberButton {
        cursor: pointer;
        border: 1px solid lightgray;
      }
    }
    .applyButton {
      width: calc(100% - 2px);
      cursor: pointer;
      height: 72px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid lightgray;
    }
  }
`;

export const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 72px;
  border: 1px solid lightgray;

  div {
    display: flex;
    height: 100%;
    width: 120px;
    justify-content: center;
    align-items: center;
  }
`;
