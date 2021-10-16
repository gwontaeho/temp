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

  select {
    margin-right: 24px;
  }
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
    cursor: pointer;
    :hover {
      color: lightgray;
    }
  }
`;

export const List = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  height: 72px;
  border-bottom: 1px solid lightgray;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:hover {
    color: lightgray;
  }
`;

export const Text = styled.div`
  padding: 24px;
  width: calc(100% - 48px);
  border-bottom: 1px solid lightgray;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    div {
      margin-left: 24px;
    }
  }
`;

export const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  textarea {
    width: 80%;
    margin-top: 24px;
    margin-bottom: 24px;
    resize: none;
    border: 1px solid lightgray;
    padding: 24px;
  }

  textarea:focus {
    outline: none;
  }
`;
