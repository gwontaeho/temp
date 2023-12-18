import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledModal = styled(Modal)`
  .container {
    position: absolute;
    width: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 30px;
  }
  .header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .list {
    width: 100%;
  }
  .item {
    width: calc(100% - 60px);
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
  }
  .profile {
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 30px;
    }
  }
  .button {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export const Article = styled.article`
  width: 700px;
  position: relative;

  @media screen and (max-width: 767px) {
    width: 450px;
  }
`;

export const SoldTag = styled.div`
  width: 100%;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(238, 238, 238, 0.3);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-weight: bold;
  color: #ddd;
`;

export const Img = styled.div`
  img {
    width: 100%;
    height: 500px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const Controls = styled.section`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  a {
    color: #3f51b5;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const Wish = styled.section`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .icon {
    cursor: pointer;
  }
`;

export const Text = styled.section`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  .address {
    width: 100%;
    font-size: smaller;
  }
  .date {
    width: 100%;
    color: gray;
    font-size: smaller;
  }
  .name {
    width: 100%;
    font-size: 1.4rem;
    font-weight: bold;
    padding: 10px 0;
  }
  .price {
    width: 100%;
    font-size: 1.2rem;
    font-weight: bold;
    color: #3f51b5;
  }
  .intro {
    width: 100%;
    white-space: pre-wrap;
    font-size: 1.1rem;
  }
`;

export const Seller = styled.section`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .profile {
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }

  a {
    color: #3f51b5;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const Comment = styled.section`
  width: 100%;
  .title {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  .write {
    width: calc(100% - 40px);
    height: 100px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    align-items: center;
  }
  .list {
    width: 100%;
    padding: 30px 0;
  }
`;

export const CommentItem = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const Question = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  padding: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .nickname {
    font-weight: bold;
  }

  .date {
    font-size: smaller;
    color: gray;
  }

  .text {
    word-break: break-all;
  }

  .reply {
    color: gray;
    cursor: pointer;
    :hover {
      color: black;
    }
  }
  .reply-write {
    display: none;
  }
`;

export const Answer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  padding: 20px;
  padding-left: 90px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .nickname {
    font-weight: bold;
  }

  .date {
    font-size: smaller;
    color: gray;
  }

  .text {
    word-break: break-all;
  }
`;
