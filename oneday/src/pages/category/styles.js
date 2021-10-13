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
`;

export const Nav = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid lightgray;

  a {
    margin-right: 24px;
    :hover {
      color: gray;
    }
  }
`;

export const Products = styled.div`
  width: calc(100% - 48px);
  display: grid;
  padding: 24px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;

  a {
    display: flex;
    flex-direction: column;
    position: relative;

    div {
      padding-left: 12px;
      height: 36px;
      display: flex;
      align-items: center;
    }

    .address {
      position: absolute;
      color: white;
      bottom: 72px;
      width: calc(100% - 12px);
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 0 0 12px 12px;
    }

    .rating {
      position: absolute;
      bottom: 108px;
      width: calc(100% - 12px);
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 12px 12px 0 0;
    }

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 12px;
      transition: 0.2s;
      :hover {
        opacity: 0.8;
        transition: 0.2s;
      }
    }
  }
`;
