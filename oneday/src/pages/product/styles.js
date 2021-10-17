import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid lightgray;
`;

export const Image = styled.div`
  flex: 1.5;
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 600px;
    object-fit: cover;
    border-radius: 48px;
    margin-bottom: 24px;
  }

  .title {
    width: calc(100% - 48px);
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    flex-direction: column;
  }

  .rating {
    height: 36px;
    display: flex;
    align-items: center;
  }

  .name {
    font-size: 2rem;
  }
`;

export const Schedule = styled.div`
  flex: 1;
  padding: 24px;
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
  border-radius: 24px;
  transition: 1s;
  background-color: white;
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
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  .selectNumber {
    display: flex;
    justify-content: center;
    height: 36px;
    & > div {
      padding: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .selectNumberButton {
      cursor: pointer;
      border: 1px solid lightgray;
    }
  }
`;

export const ApplyButton = styled.div`
  border: 1px solid lightgray;
  height: 72px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  cursor: pointer;
`;

export const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 72px;
  border-bottom: 1px solid lightgray;

  div {
    display: flex;
    height: 100%;
    width: 120px;
    justify-content: center;
    align-items: center;
  }
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
`;

export const Routes = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 24px;
  margin-top: 24px;
`;
