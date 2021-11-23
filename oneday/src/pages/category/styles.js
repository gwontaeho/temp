import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  font-size: 2rem;
`;

export const Nav = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid lightgray;

  div {
    margin-right: 24px;
    :hover {
      color: gray;
      cursor: pointer;
    }
  }
`;

export const List = styled.div`
  width: calc(100% - 48px);
  display: grid;
  padding: 24px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

export const Item = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 12px;

  .img {
    width: 100%;
    display: flex;
    position: relative;
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
    transition: 0.2s;
    :hover {
      opacity: 0.8;
      transition: 0.2s;
    }
  }
  .rating {
    position: absolute;
    padding-left: 12px;
    bottom: 0;
    width: calc(100% - 12px);
    height: 36px;
    display: flex;
    align-items: center;
  }
  .info {
    width: calc(100% - 24px);
    padding: 0 12px 0 12px;
    > div {
      width: 100%;
      min-height: 36px;
      display: flex;
      align-items: center;
    }
  }
  .address {
    > div {
      line-height: 36px;
      margin-left: 6px;
    }
  }
`;
