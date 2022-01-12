import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

export const Slider = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 100px);
  overflow: hidden;

  > div {
    position: absolute;
    width: fit-content;
    left: 0;
    display: flex;
    transition: 0.8s;

    > div {
      width: 1100px;
      :not(:last-child) {
        margin-right: 100px;
      }
    }
  }
`;
