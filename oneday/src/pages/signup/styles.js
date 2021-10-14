import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IndexContainer = styled.div`
  width: 720px;
`;

export const Title = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TypeContainer = styled.div`
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  & a {
    border: 1px solid black;
    border-radius: 50%;
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
