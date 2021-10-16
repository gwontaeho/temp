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
`;

export const State = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 72px;
`;

export const CalendarNList = styled.div`
  width: calc(100% - 48px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding-left: 24px;
  padding-right: 24px;
  .calendar {
    flex: 1;
  }
`;

export const List = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 24px;
`;

export const Item = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr 1fr 1fr 1fr;
  height: 72px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :not(:last-child) {
    border-bottom: 1px solid lightgray;
  }

  a:hover {
    color: lightgray;
  }
`;
