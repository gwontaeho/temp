import styled from "@emotion/styled";

export const Container = styled.div`
  width: calc(100% - 48px);
  padding: 24px;

  .routes {
    width: 100%;
    border: 1px solid black;
  }
`;

export const Info = styled.div`
  width: 100%;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;

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
  }

  .reserve {
    .title {
      justify-content: center;
    }
    .calendar {
      display: flex;
      justify-content: center;
      width: 100%;
      border: 1px solid red;
    }
    select {
      width: 100%;
      height: 72px;
      border: 1px solid blue;
      text-align-last: center;
      outline: none;
    }
  }
`;

export const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 72px;
  border: 1px solid black;

  div {
    display: flex;
    height: 100%;
    width: 120px;
    justify-content: center;
    align-items: center;
  }
`;
