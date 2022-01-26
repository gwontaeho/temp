import styled from "@emotion/styled";

export const Container = styled.article`
  width: 100%;
  height: 100%;
  background-color: #eee;
  padding: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 3rem;
  margin-bottom: 50px;
`;

export const Article = styled.article`
  flex: 1;
  display: flex;
`;

export const Section1 = styled.section`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;

export const Section2 = styled.section`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const Card = styled.div`
  width: 70%;
  height: 70%;
  max-height: 600px;
  border-radius: 50px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const Intro = styled.div`
  margin: 10px 0;
`;

export const Intro2 = styled.div`
  margin: 10px 0;
`;

export const Info = styled.div`
  margin: 10px 0;
`;
