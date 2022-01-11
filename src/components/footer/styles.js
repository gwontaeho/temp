import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid #eee;
  padding: 37px 0 48px;
`;

export const Inner = styled.div`
  width: 1296px;

  box-sizing: border-box;
  @media screen and (max-width: 1440px) {
    width: 952px;
  }

  @media screen and (max-width: 1024px) {
    width: 630px;
  }

  @media screen and (max-width: 768px) {
    width: 364px;
  }
`;

export const Service = styled.div`
  display: flex;

  .icon {
    display: none;
  }

  > div {
    width: calc(100% / 6);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-top: 12px;
    color: gray;
  }

  .strong {
    display: block;
    margin-top: 36px;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    border-top: 1px solid #e6e6e6;

    > div {
      width: 100%;
    }

    .icon {
      display: block;
    }

    strong {
      display: flex;
      padding: 13px 0 15px;
      border-bottom: 1px solid #e6e6e6;
      justify-content: space-between;
    }

    .strong {
      margin: 0;
    }
    ul {
      display: none;
    }
  }
`;

export const Relation = styled.div`
  margin-top: 120px;
  .group_info {
    display: flex;
    float: left;
    > div {
      margin-right: 24px;
    }
  }

  .relation {
    float: right;
    padding: 10px 20px 12px;
    background-color: lightgray;
    border-radius: 24px;
  }

  .copyright {
    clear: both;
    color: gray;
  }

  @media screen and (max-width: 1440px) {
    .group_info {
      float: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      > div {
        width: 100%;
        margin-top: 15px;
      }
    }

    .relation {
      margin-top: 58px;
      width: 297px;
    }

    .copyright {
      float: left;
      margin-top: -30px;
    }
  }

  @media screen and (max-width: 768px) {
    .relation {
      float: none;
    }

    .copyright {
      float: none;
      clear: none;
      margin-top: 48px;
    }
  }
`;
