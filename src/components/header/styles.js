import styled from "@emotion/styled";
import bg_search from "../../images/home/bg_search.png";
import input from "../../images/home/input.svg";
import input2 from "../../images/home/input2.svg";
import input3 from "../../images/home/input3.svg";
import input4 from "../../images/home/input4.svg";

export const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 777;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.scrolled {
    border-bottom: 1px solid #eee;
  }
  &.open {
    margin-bottom: 400px;
  }
  transition: margin 0.5s;

  &.dark {
    background-color: black;

    .inner {
      background-color: black;
    }

    .buttons {
      > div {
        :hover {
          background-color: #333;
        }
    }

    svg {
      stroke: #fff;
    }
  }
`;

export const Inner = styled.div`
  z-index: 888;
  background-color: white;
  width: 1296px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

export const Logo = styled.div`
  cursor: pointer;
  font-size: 1.8rem;
`;

export const Nav = styled.ul`
  list-style: none;
  padding: 0;
  li {
    display: inline;
    margin: 0 28px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const Buttons = styled.div`
  display: flex;

  > div {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 12px;
    :hover {
      background-color: #eee;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: #000;
  }

  .hamburger {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    .mode {
      display: none;
    }
    .hamburger {
      display: flex;
    }
  }
`;

export const Search = styled.div`
  position: absolute;
  padding: 120px 0;
  background: url(${bg_search}) no-repeat top 96px right 50px;
  background-size: 162px 178px;
  top: 72px;
  width: 1296px;
  margin: 0 auto;
  text-align: center;
  transform: translateY(-100%);
  transition: 0.5s;
  &.open {
    transform: translateY(0);
  }

  .input {
    width: 823px;
    margin: 0 auto;
  }

  input {
    width: 100%;
    padding: 20px 24px 20px 64px;
    border: 0;
    background: url(${input}) no-repeat;
    line-height: 32px;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.6px;
    box-sizing: border-box;
    outline: none;

    ::placeholder {
      color: #fff;
    }
  }

  .tag {
    max-width: 600px;
    margin: 30px auto 0;

    a {
      margin-top: 6px;
      display: inline-block;
      overflow: hidden;
      max-width: 100%;
      height: 34px;
      margin-right: 6px;
      padding: 0 15px;
      border-radius: 34px;
      line-height: 34px;
      color: #000;
      background-color: #eee;
      vertical-align: top;
      letter-spacing: -0.5px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  @media screen and (max-width: 1440px) {
    width: 952px;
    padding: 96px 0;
    background-position: top 72px right 30px;
    background-size: 132px 146px;
    .input {
      width: 600px;
    }
    input {
      padding: 18px 24px 18px 60px;
      background-image: url(${input2});
      line-height: 24px;
      font-size: 18px;
      letter-spacing: -0.5px;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 666px;
    padding: 84px 0;
    background-position: top 78px right;
    background-size: 96px 106px;
    .input {
      width: 450px;
    }
    input {
      background-image: url(${input3});
    }
  }

  @media screen and (max-width: 768px) {
    width: 364px;
    padding: 72px 0;
    background-position: top 65px right;
    background-size: 63px 70px;

    .input {
      width: 81.35%;
      margin: 0 0 auto 0;
      position: relative;
      ::after {
        position: absolute;
        bottom: 0;
        right: -5px;
        width: 20px;
        height: 20px;
        background-image: url(${input4});
        content: "";
      }
    }
    input {
      background-image: none;
      height: 60px;
      border-radius: 22px;
      background-color: #333;
    }
    .tag {
      text-align: center;
    }
  }
`;
