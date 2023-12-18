import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Info = styled.div`
  width: calc(100% - 48px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid lightgray;
  padding: 24px;
  grid-gap: 24px;
`;

export const Image = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 100%;
    height: 480px;
    object-fit: cover;
    border-radius: 48px;
    margin-bottom: 24px;
  }

  .name {
    display: flex;
    width: calc(100% - 48px);
    height: 72px;
    padding-left: 24px;
    padding-right: 24px;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    margin-bottom: 24px;
  }

  .introduce {
    width: calc(100% - 48px);
    border: 1px solid lightgray;
    padding: 24px;
    display: flex;
    border-radius: 12px;
    margin-bottom: 24px;
    img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 12px;
      margin-right: 24px;
    }

    > div {
      flex: 1;
    }

    .company {
      font-size: 1.5rem;
    }
  }

  .info {
    width: 100%;
    height: 120px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    border: 1px solid lightgray;
    border-radius: 12px;
    > div {
      display: flex;
      align-items: center;
      padding-left: 120px;
      > div {
        padding-left: 12px;
      }
    }
  }
`;

export const Schedule = styled.div`
  flex: 1;
  > button {
    width: 100%;
    height: 72px;
  }
`;

export const SelectBox = styled.div`
  position: relative;
  width: 100%;
  height: 72px;
  margin-bottom: 24px;
`;

export const Select = styled.div`
  position: absolute;
  width: 100%;
  max-height: 72px;
  overflow: hidden;
  border: 1px solid lightgray;
  border-radius: 12px;
  transition: 0.8s;
  background-color: white;
  z-index: 10;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
`;

export const List = styled.div`
  width: 100%;
`;

export const ListItem = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
`;

export const Personnel = styled.div`
  width: calc(100% - 48px);
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 1.5rem;
  padding: 0 24px 0 24px;

  .buttons {
    display: flex;
    height: 100%;
    align-items: center;

    > *:not(:last-child) {
      margin-right: 24px;
    }
  }
`;

export const Box = styled.div`
  width: calc(100% - 48px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  padding: 24px;
`;

export const Nav = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

export const Routes = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 24px;
`;
