import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 24px;
`;

export const Ad = styled.div`
  position: relative;
  top: 0;
  left: calc((100vw - 1200px) / -2);
  width: 100vw;
  height: 240px;
  border: 1px solid black;
`;

export const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContentsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;
  padding-bottom: 24px;

  .class {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.2s;
    border-radius: 12px;

    div {
      width: calc(100% - 48px);
      height: 60px;
      line-height: 60px;
      padding-left: 48px;
    }

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
  }

  .class:hover {
    opacity: 0.8;
    transition: 0.2s;
  }
`;
