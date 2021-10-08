import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  background-color: white;

  .btns {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btns a {
    padding: 12px;
  }

  .classes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 24px;
    gap: 24px;
  }

  .classes a {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 12px;
    }
    div {
      display: flex;
      height: 36px;
      align-items: center;
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
`;
