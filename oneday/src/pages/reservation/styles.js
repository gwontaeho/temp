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

export const ProductInfoHeader = styled.div`
  width: 100%;
  height: 72px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid lightgray;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ProductInfo = styled.div`
  width: 100%;
  height: 120px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid lightgray;

  .product_info {
    display: flex;
    align-items: center;
    padding-left: 24px;
  }

  img {
    width: 96px;
    height: 96px;
    object-fit: cover;
    border-radius: 24px;
    margin-right: 24px;
  }
  > div:not(.product_info) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 240px 240px;
  border-bottom: 1px solid lightgray;

  > div {
    display: grid;
    grid-template-rows: 72px 72px;
    align-items: center;
    padding-left: 24px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  width: calc(100% - 48px);
  padding-left: 24px;
  padding-right: 24px;
  height: 120px;
  justify-content: flex-end;
  align-items: center;
  button {
    height: 48px;
    width: 96px;
    margin-left: 24px;
  }
`;
