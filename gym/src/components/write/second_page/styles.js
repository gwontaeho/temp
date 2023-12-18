import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  font-size: 2rem;
  font-weight: bold;
`;

export const Header2 = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Time = styled.div`
  height: 100px;
  padding-left: 50px;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  > input {
    width: 100px;
    height: 50px;
    text-align: center;
    border: 0;
    border-bottom: 1px solid lightgray;
    outline: none;
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 30px;
  }
  > input:hover,
  > input:focus {
    border-color: gray;
  }
`;

export const AddDetail = styled.div`
  padding-left: 50px;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  > input {
    width: 100px;
    height: 50px;
    text-align: center;
    border: 0;
    border-bottom: 1px solid lightgray;
    outline: none;
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 30px;

    :hover,
    :focus {
      border-color: gray;
    }
  }

  .input-detail-name {
    width: 300px;
  }

  .add-button {
    margin-left: 30px;
    cursor: pointer;
    :hover {
      color: #b4b4b4;
    }
  }
`;

export const DetailsList = styled.div`
  width: calc(100% - 100px);
  padding-left: 50px;
  height: 300px;
  overflow: auto;
`;

export const DetailsItem = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  font-size: 1.1rem;

  .remove-button {
    margin-left: 30px;
    cursor: pointer;
    :hover {
      color: #b40000;
    }
  }
`;

export const PageControls = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;

  > div {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    :hover {
      color: #b4b4b4;
    }
  }
`;
