import styled from "@emotion/styled";

export const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Contents = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  font-size: 3rem;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

export const Img = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 500px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const Icons = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  label {
    cursor: pointer;
    margin-left: 25px;
  }
`;

export const Inputs = styled.div`
  width: 100%;

  .name,
  .price,
  .address {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 300px;
    resize: none;
    padding: 25px;
    outline-color: #3f51b5;
    margin-top: 25px;
    border-color: #ddd;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
