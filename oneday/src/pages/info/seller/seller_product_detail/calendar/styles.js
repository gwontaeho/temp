import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 24px;
`;

export const Head = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  & div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 6px;
  width: 100%;
  height: 48px;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Dates = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 48px);
  width: 100%;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    color: lightgray;
    cursor: pointer;
  }
  .includes {
    color: black;
  }
  .today {
    border: 1px solid lightgray;
  }
  .includes:hover {
    color: gray;
  }
  .selected {
    background-color: lightgray;
    color: white;
  }
`;
