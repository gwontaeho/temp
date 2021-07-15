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

export const ClassInfo = styled.div`
  display: flex;

  img {
    width: 240px;
    height: 240px;
    object-fit: cover;
  }

  > div {
    border: 1px solid black;
    flex: 1;
    display: flex;
    align-items: center;
  }
`;
