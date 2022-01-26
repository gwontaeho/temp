import styled from "@emotion/styled";

export const Container = styled.article`
  width: 100%;
  height: 100%;
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
  flex-direction: column;
`;

export const Section = styled.section`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  align-items: center;
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

export const SkillTitle = styled.div`
  font-size: 1.1rem;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const Skill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  > span {
    margin-top: 10px;
    text-align: center;
  }
  > div {
    width: 30px;
    height: 30px;
    perspective: 100px;
  }
  svg,
  img {
    width: 100%;
    height: 100%;
    transition: 0.5s;
  }
  :hover {
    svg,
    img {
      transform: rotateY(360deg);
    }
  }

  @media screen and (max-width: 1023px) {
    span {
      display: none;
    }
  }
`;
