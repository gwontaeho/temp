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
  font-size: 1.3rem;
  font-weight: bold;
`;

export const Controls = styled.div`
  width: calc(100% - 100px);
  height: 100px;
  padding: 0 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;

  > div {
    cursor: pointer;
    :hover {
      color: #00b400;
    }
  }
`;

export const Text = styled.div`
  padding-left: 50px;
  font-size: 1.4rem;
  font-weight: bold;
  height: 100px;
  display: flex;
  align-items: center;
`;

export const RecordsList = styled.div`
  width: 100%;
  height: 600px;
  overflow: auto;
`;

export const RecordsItem = styled.div`
  .record {
    position: relative;
    font-size: 1.2rem;
    font-weight: bold;

    height: 100px;
    display: flex;
    align-items: center;

    .expand-button {
      position: relative;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.1s;

      :hover {
        > div {
          background-color: #00b400;
        }
      }

      > div {
        position: absolute;
        width: 12px;
        height: 2px;
        background-color: #b4b4b4;
      }

      .rotate {
        transform: rotate(90deg);
        transition: transform 0.2s, opacity 0.2s;
      }
    }

    .available {
      cursor: pointer;
    }

    .remove-button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      right: 0;
      cursor: pointer;
      transition: 0.1s;
      > div {
        position: absolute;
        width: 12px;
        height: 2px;
        background-color: #b40000;
      }
      :hover {
        background-color: #b40000;
        > div {
          background-color: #ffffff;
        }
      }
    }
  }

  .record-details {
    max-height: 0;
    overflow: hidden;
    transition: 0.5s;
    padding-left: 50px;
    background-color: #00b400;
    color: white;
  }

  .record-detail {
    height: 50px;
    display: flex;
    align-items: center;
  }
`;
