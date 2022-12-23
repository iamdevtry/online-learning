import { gql } from '@apollo/client';

export const SKILLS_QUERY = gql`
    query Query {
        skills {
            id
            name
        }
    }
`;
export const SKILL_NAME_QUERY = gql`
    query Skill($skillId: ID!) {
        skill(id: $skillId) {
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

export const LESSONS_BY_SKILL_ID_QUERY = gql`
    query LessonsBySkill($skillId: ID!) {
        lessonsBySkill(skillId: $skillId) {
            id
            title
            thumbnail
            shortDescription
            skillId
            levelId
        }
    }
`;

export const LESSON_BY_ID_QUERY = gql`
    query Lesson($lessonId: ID!) {
        lesson(id: $lessonId) {
            id
            title
            description
            content
            skillId
            media {
                url
            }
        }
    }
`;

export const SEARCH_LESSONS_QUERY = gql`
    query LessonByKeyword($keyword: String!) {
        lessonByKeyword(keyword: $keyword) {
            id
            title
            thumbnail
            skillId
        }
    }
`;
