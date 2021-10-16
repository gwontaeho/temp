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

export const Product = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid lightgray;
  .info {
    flex: 1;
  }
`;

export const Image = styled.div`
  width: 360px;
  height: 360px;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
  }
`;

export const InfoHeaderA = styled.div`
  width: 100%;
  height: 72px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const InfoHeaderB = styled.div`
  width: 100%;
  height: 72px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const State = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 72px;
`;

export const Schedule = styled.div`
  width: calc(100% - 48px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid lightgray;
  .calendar {
    flex: 1;
  }
`;

export const List = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 24px;
`;

export const Item = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 72px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a:hover {
    color: lightgray;
  }
`;

export const AddSchedule = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  border-bottom: 1px solid lightgray;
  width: calc(100% - 24px);
  padding-left: 24px;

  > div {
    padding-right: 24px;
  }

  input,
  select {
    width: 72px;
    height: 36px;
    border: 1px solid lightgray;
    margin-right: 6px;
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
