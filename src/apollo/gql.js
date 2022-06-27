import {gql} from '@apollo/client';

const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $role: String!) {
    createUser(email: $email, password: $password, role: $role) {
      id
    }
  }
`;

const GET_FUNDINGS = '';

export {CREATE_USER};
