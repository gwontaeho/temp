import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  height: 100%;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  padding: 100px;
  box-sizing: border-box;
  overflow-y: overlay;
  > * {
    transition: 0.5s;
    opacity: 0;
    transform: translateY(50px);
  }
  &.open {
    > * {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Title = styled.div`
  font-size: 3rem;
  @media screen and (max-width: 1439px) {
    margin-bottom: 50px;
  }
`;

export const Article = styled.article`
  flex: 1;
  padding: 50px;
  display: flex;
  @media screen and (max-width: 1439px) {
    flex-direction: column;
    padding: 0;
  }
`;

export const Section = styled.section`
  width: 800px;
  > video {
    width: 100%;
  }
  > div {
    display: flex;
    justify-content: flex-end;
    a {
      display: flex;
      align-items: center;
      margin: 0 25px;
      text-decoration: none;
      color: black;
    }
    span {
      margin-right: 10px;
    }
    .github {
      width: 50px;
    }
    .githubpages {
      width: 100px;
    }
  }
  .alt {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 10px;
  }

  @media screen and (max-width: 1439px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

export const Section2 = styled.section`
  flex: 1;
  margin-left: 50px;
  @media screen and (max-width: 1439px) {
    margin: 0;
  }
`;

export const Text = styled.div`
  margin-bottom: 50px;
`;

export const Title2 = styled.div`
  background-color: #eee;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 25px;
`;

export const Skills = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 1599px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 1439px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Skill = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100px;
  cursor: pointer;
  > span {
    margin-left: 10px;
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

  @media screen and (max-width: 767px) {
    span {
      display: none;
    }
  }
`;
