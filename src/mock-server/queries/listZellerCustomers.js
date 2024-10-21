import { gql } from '@apollo/client';

export const LIST_USERS_QUERY = gql`
  query ListZellerCustomers($role: String!) {
    listZellerCustomers(filter: { role: { eq: $role } }) {
      items {
        id
        name
        role
      }
    }
  }
`;