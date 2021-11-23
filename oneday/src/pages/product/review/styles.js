import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: calc(100% - 24px);
  height: 72px;
  display: flex;
  padding-left: 24px;
  justify-content: flex-start;
  align-items: center;
`;

export const List = styled.div`
  width: calc(100% - 48px);
  padding: 0 24px 0 24px;
`;

export const Item = styled.div`
  width: calc(100% - 48px);
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  border: 1px solid lightgray;
  border-radius: 12px;
  min-height: 60px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 24px;
    object-fit: cover;
  }

  .text {
    flex: 1;
    margin-left: 24px;
    white-space: pre-wrap;
  }
`;
