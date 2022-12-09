import { gql } from '@apollo/client';

export const SKILLS_QUERY = gql`
    query Query {
        skills {
            id
            name
        }
    }
`;

export const LESSONS_QUERY = gql`
    query Lessons {
        lessons {
            id
            title
            thumbnail
            shortDescription
            skillId
            levelId
        }
    }
`;
