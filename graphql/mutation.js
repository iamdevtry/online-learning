import { gql } from '@apollo/client';
import { LOGGED_USER_DETAILS } from './fragments';

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ...LoggedUserDetails
        }
    }
    ${LOGGED_USER_DETAILS}
`;
