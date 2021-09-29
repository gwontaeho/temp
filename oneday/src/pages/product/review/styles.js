import styled from "@emotion/styled";

export const Container = styled.div`
  width: calc(100% - 48px);
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: calc(720px - 48px);
  padding-left: 24px;
  padding-right: 24px;
  height: 72px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ReviewList = styled.div`
  width: 720px;
`;

export const ReviewItem = styled.div`
  width: calc(100% - 48px);
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 12px;

  .id {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
