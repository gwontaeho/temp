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
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

export const TypeContainer = styled.div`
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  & a {
    width: 240px;
    height: 240px;
    margin: 24px;
    background-color: rgba(25, 118, 210, 0.4);
    border-radius: 50%;
    font-size: 2rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      background-color: rgba(25, 118, 210, 0.8);
      transition: 0.2s;
    }
  }
`;
