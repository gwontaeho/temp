import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  background-color: lightgrey;
`;

export const Info = styled.div`
  display: flex;
  margin-bottom: 24px;

  & > div {
    background-color: lightpink;
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
  }

  & > div > div {
    margin-bottom: 12px;
  }
`;

export const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightgreen;

  .title {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  .addClass {
    display: flex;
    height: 36px;
    margin-bottom: 12px;
  }

  .addClass > input {
    width: 60px;
  }
`;

export const ScheduleList = styled.div`
  padding-left: 12px;
  display: flex;
  height: 36px;
  width: 600px;
  align-items: center;
  border: 1px solid gray;
  border-radius: 6px;
  margin-bottom: 12px;
  & > div {
    margin-right: 12px;
  }
`;
