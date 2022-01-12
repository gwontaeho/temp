import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-button {
    width: calc(100% / 7);
    display: flex;
    justify-content: center;
    cursor: pointer;
    :hover {
      color: #b4b4b4;
    }
  }

  .header-date {
    font-size: 1.3rem;
    cursor: pointer;
    :hover {
      color: #00b400;
      :after {
        opacity: 1;
      }
    }
  }
`;

export const Days = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .saturday {
    color: #0000b4;
  }

  .sunday {
    color: #b40000;
  }
`;

export const Dates = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 100px);
  align-items: center;
  justify-items: center;

  div {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;

    :hover {
      color: #b4b4b4;
    }
  }

  .today {
    border: 1px solid #00b400;
  }

  .isIn {
    position: relative;
  }

  .isIn::after {
    content: "";
    position: absolute;
    bottom: -10px;
    width: 50%;
    height: 2px;
    background-color: #00b400;
  }

  .current {
    background-color: #00b400;
    color: white;
  }
`;
