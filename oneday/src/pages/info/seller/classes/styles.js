import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  background-color: white;

  .btns {
    height: 48px;
    margin-bottom: 24px;
    display: flex;
  }
  .btns a {
    width: 120px;
    height: 100%;
    text-align: center;
    line-height: 48px;
  }

  .classes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .classes a {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
    }
  }
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
