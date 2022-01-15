import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 3rem;
  display: flex;
  align-items: center;
`;

export const Img = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin: 50px 0;
`;

export const Contents = styled.div`
  > *:not(:last-child) {
    margin-bottom: 25px;
  }
  .img {
    display: flex;
    justify-content: space-between;
  }
  .textfield {
    width: 300px;
  }
  .nickname,
  .password {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
