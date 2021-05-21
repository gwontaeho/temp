import styled from "@emotion/styled";

export const Container = styled.div`
  width: 360px;
`;

export const Head = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  & div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 6px;
    width: 100%;
    height: 36px;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .dates {
    display: grid;
    grid-gap: 6px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 36px);
    width: 100%;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
    }
    .includes {
      background-color: lightgray;
    }
    .today {
      border: 1px solid lightgray;
    }

    .date:hover {
      cursor: pointer;
      color: gray;
    }
  }
`;
