import {gql} from '@apollo/client';

const CREATE_USER = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`;

const GET_FUNDING = gql`
  query funding($id: Int!) {
    funding(id: $id) {
      id
      title
      bondPrice
      bondTotalNumber
      remainingBonds
      artist {
        id
        name
      }
    }
  }
`;

const GET_FUNDINGS = gql`
  query fundingList {
    fundingList {
      id
      title
      artist {
        id
        name
      }
    }
  }
`;

const GET_ACCOUNT_CASH = gql`
  query accountCash {
    accountCash {
      balance
    }
  }
`;

const CREATE_PARTICIPATION = gql`
  mutation fundParticipation($id: Int!, $balance: Int!) {
    fundParticipation(id: $id, balance: $balance) {
      id
    }
  }
`;

export {
  CREATE_USER,
  GET_FUNDINGS,
  GET_FUNDING,
  GET_ACCOUNT_CASH,
  CREATE_PARTICIPATION,
};
