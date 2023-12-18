import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const List = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid lightgray;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;

  .info {
    display: flex;
    align-items: center;
    padding-left: 24px;
  }

  img {
    width: 120px;
    height: 96px;
    object-fit: cover;
    margin-right: 24px;
    border-radius: 12px;
  }

  .classDate {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      :hover {
        color: lightgray;
      }
    }
  }
`;
