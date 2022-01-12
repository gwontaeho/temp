import styled from "@emotion/styled";
import calendar from "../../images/home/ico_date3.gif";
import text from "../../images/home/text.svg";
import text_dark from "../../images/home/text_dark.svg";
import service from "../../images/home/bg_home_service.png";
import recruit from "../../images/home/bg_home_recruit.png";
import tit_card from "../../images/home/tit_card.svg";

export const Container = styled.div`
  width: 1296px;
  padding-bottom: 182px;

  &.dark {
    .card {
      background-color: #333;
    }
    .text {
      background-color: #444;
      :before {
        background: url(${text_dark});
      }
    }
    .culture {
      background-color: #fff;
      color: black;
    }
    .collection > div {
      background-color: #444;
    }
  }

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

export const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  padding: 96px 0;

  .calendar {
    padding-left: 84px;
    background: url(${calendar}) no-repeat;
    background-size: 72px 72px;
  }

  @media screen and (max-width: 1440px) {
    font-size: 2.3rem;
    .calendar {
      padding-left: 68px;
      background-size: 56px 56px;
    }
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.9rem;
    .calendar {
      padding-left: 50px;
      background-size: 40px 40px;
      line-height: 40px;
    }
  }
`;

export const Section = styled.div`
  display: flex;
  margin: 0 -18px 30px;
  min-height: 420px;

  @media screen and (max-width: 1440px) {
    min-height: 876px;
    margin: 0 -13px 30px;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

export const Item = styled.div`
  display: flex;
  padding: 0 18px;
  width: 630px;

  @media screen and (max-width: 1440px) {
    padding: 0 13px;

    &.responsive {
      flex: 1;
    }
  }

  @media screen and (max-width: 1024px) {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 26px);
  }

  @media screen and (max-width: 768px) {
    &.responsive {
      min-height: 876px;
    }
  }
`;

export const Inner = styled.div`
  width: 100%;
  position: relative;
`;

export const Card = styled.div`
  border-radius: 14px;
  padding: 25px 24px 0;
  box-sizing: border-box;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  transition: box-shadow 0.2s, transform 0.2s, top 0.5s, left 0.5s;
  overflow: hidden;
  :hover {
    box-shadow: 4px 12px 20px 6px rgb(0 0 0 / 18%);
    transform: translateY(-5px);
  }

  .img {
    margin: 24px -24px 0;
    height: calc(100% - 156px);
    img {
      display: block;
      width: 100%;
      min-height: 100%;
      object-fit: cover;
    }
  }

  .header {
    display: flex;
  }

  .icon {
    width: 36px;
    height: 36px;
    margin-right: 8px;
  }

  .text {
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0 13px;
    background-color: #eee;
    height: 34px;
    :before {
      position: absolute;
      top: 0;
      left: -4px;
      width: 16px;
      height: 16px;
      background: url(${text});
      content: "";
    }
  }

  .title {
    margin-top: 13px;
    font-size: 2rem;
    letter-spacing: -1px;
    font-weight: bold;
  }

  .title2 {
    margin-top: 13px;
    font-size: 1.1rem;
    letter-spacing: -1px;
    font-weight: bold;
  }

  .tit_card {
    display: inline-block;
    overflow: visible;
    position: relative;
    height: auto;
    margin-top: 13px;
    padding: 8px 20px 8px 25px;
    border-radius: 15px;
    font-size: 16px;
    line-height: 26px;
    color: #000;
    background-color: #fee102;
    -webkit-box-orient: initial;
    -webkit-line-clamp: initial;

    :before {
      position: absolute;
      top: 0;
      left: -5px;
      width: 18px;
      height: 18px;
      background: url(${tit_card});
      content: "";
    }
  }

  .customer {
    margin: 12px -24px 0;
    font-size: 0;
    text-align: center;
    list-style: none;
    padding: 0;
    li {
      display: inline-block;
      margin: 0 4px;
    }

    a {
      height: 42px;
      padding: 0 20px;
      border-radius: 15px;
      font-size: 16px;
      line-height: 42px;
      color: #666;
      background-color: #f4f4f4;
      display: block;
    }
  }

  .stock {
    margin-top: 13px;
    .num {
      font-size: 2.5rem;
    }
  }

  .info {
    margin-top: 21px;
    span {
      margin-right: 3px;
      color: gray;
    }
  }

  &.card-fix {
    width: 100%;
    height: calc(100vh - 132px);
    position: sticky;
    top: 102px;
  }

  &.card-res-2,
  &.card-res-3 {
    position: absolute;
    width: 297px;
  }

  &.card-res-1 {
    height: 420px;
    width: 297px;
  }

  &.card-res-2 {
    height: 192px;
    top: 0;
    left: 333px;
  }

  &.card-res-3 {
    height: 192px;
    top: 230px;
    left: 333px;
  }

  @media screen and (max-width: 1440px) {
    &.card-res-2 {
      top: 456px;
      left: 0px;
    }

    &.card-res-3 {
      top: 684px;
      left: 0px;
    }
  }

  @media screen and (max-width: 1024px) {
    &.card-res-2 {
      height: 192px;
      top: 0;
      left: 333px;
    }

    &.card-res-3 {
      height: 192px;
      top: 230px;
      left: 333px;
    }
  }

  @media screen and (max-width: 768px) {
    &.card-res-1,
    &.card-res-2,
    &.card-res-3 {
      width: 100%;
    }

    &.card-res-2 {
      top: 456px;
      left: 0px;
    }

    &.card-res-3 {
      top: 684px;
      left: 0px;
    }
  }
`;

export const Culture = styled.div`
  width: 100%;
  height: 540px;
  margin-bottom: 30px;
  padding: 54px 66px 0;
  box-shadow: 2px 5px 40px 0 rgb(0 0 0 / 8%);
  border-radius: 14px;
  box-sizing: border-box;
  text-align: center;

  .title {
    font-size: 2.5rem;
    font-weight: bold;
  }

  a {
    display: inline-block;
    margin-top: 36px;
    padding: 9px 20px 0;
    border-radius: 42px;
    background-color: black;
    color: white;
    height: 33px;
    line-height: 20px;
    font-size: 14px;
    vertical-align: top;
  }

  img {
    display: block;
    width: 100%;
    max-width: 900px;
    height: auto;
    margin: 50px auto 0;
  }
`;

export const Etc = styled.div`
  margin: 0 -18px;
  display: flex;

  > div {
    padding: 0 18px;
    flex: 1;

    > div {
      border-radius: 14px;
      height: 360px;
      box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
      padding: 36px 36px 0;
      box-sizing: border-box;
      background: no-repeat calc(100% - 40px) calc(100% - 40px);
    }
  }

  .service {
    background-color: #fae100;
    background-image: url(${service});
    background-size: 160px 160px;
  }

  .recruit {
    background-color: #3c64ff;
    background-image: url(${recruit});
    background-size: 309px 160px;
  }

  .title {
    max-width: 470px;
    font-size: 2rem;
    font-weight: bold;
  }

  .txt_item {
    display: inline-block;
    height: 33px;
    margin-top: 24px;
    padding: 9px 20px 0;
    border-radius: 42px;
    font-size: 14px;
    line-height: 22px;
    color: #fff;
    background-color: #000;
    vertical-align: top;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    > div {
      padding: 0 15px 36px 18px;
    }
  }

  @media screen and (max-width: 768px) {
    > div {
      > div {
        height: 480px;
      }
    }
  }
`;

export const Collection = styled.div`
  div {
    width: 260px;
    height: 60px;
    margin: 84px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgray;
    border-radius: 60px;
  }
`;
