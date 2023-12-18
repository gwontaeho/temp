import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Nav = styled.div`
  width: calc(100% - 24px);
  padding-right: 24px;
  height: 72px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid lightgray;
  div {
    margin-left: 24px;
    :not(.written) {
      cursor: pointer;
    }
    :hover:not(.written) {
      color: lightgray;
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

export const InfoHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Info = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  height: 120px;
  border-bottom: 1px solid lightgray;

  .info {
    display: flex;
    align-items: center;
    padding-left: 24px;
  }

  img {
    width: 120px;
    height: 96px;
    object-fit: cover;
    margin-right: 24px;
    border-radius: 12px;
  }

  .classDate {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      :hover {
        color: lightgray;
      }
    }
  }
`;

export const UserNLocation = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid lightgray;
`;

export const User = styled.div`
  flex: 2;
  border-right: 1px solid lightgray;
  > div {
    height: 72px;
    display: flex;
    align-items: center;
    padding-left: 24px;
  }

  .title {
    width: 120px;
  }
`;

export const Location = styled.div`
  flex: 3;
  .address {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
  }
`;

export const Map = styled.div`
  width: calc(100%-48px);
  padding: 24px;

  #map {
    width: 100%;
    height: 360px;
    border-radius: 24px;
    z-index: 0;
  }
`;

export const Review = styled.div`
  width: calc(100% - 48px);
  display: flex;
  padding: 24px;
  border-bottom: 1px solid lightgray;
  flex-direction: column;
  div:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const ModalBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 720,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};

export const ModalHeader = styled.div`
  padding: 0 24px 0 24px;
  width: calc(100% - 48px);
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .buttons {
    display: flex;
    > div:not(:last-child) {
      margin-right: 24px;
    }
  }
`;

export const ModalRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
`;

export const QuestionText = styled.div`
  width: 100%;
`;
