import { useQuery } from '@apollo/client';
import {
    SKILLS_QUERY,
    LESSONS_QUERY,
    LESSONS_BY_SKILL_ID_QUERY,
    LESSON_BY_ID_QUERY,
    SKILL_NAME_QUERY,
} from './queries';

export function useSkills() {
    const { data, loading, error } = useQuery(SKILLS_QUERY, {
        fetchPolicy: 'network-only',
    });
    return {
        skills: data?.skills,
        loading,
        error: Boolean(error),
    };
}
export function useSkillName(skillId) {
    const { data, loading, error } = useQuery(SKILL_NAME_QUERY, {
        variables: { skillId },
    });
    return {
        skill: data?.skill,
        loading,
        error: Boolean(error),
    };
}

export function useLessons() {
    const { data, loading, error } = useQuery(LESSONS_QUERY, {
        fetchPolicy: 'network-only',
    });
    return {
        lessons: data?.lessons,
        loading,
        error: Boolean(error),
    };
}

export function useLessonsBySkillId(skillId) {
    const { data, loading, error } = useQuery(LESSONS_BY_SKILL_ID_QUERY, {
        variables: { skillId },
        fetchPolicy: 'network-only',
    });
    return {
        lessons: data?.lessonsBySkill,
        loading,
        error: Boolean(error),
    };
}

export function useLessonById(lessonId) {
    const { data, loading, error } = useQuery(LESSON_BY_ID_QUERY, {
        variables: { lessonId },
        fetchPolicy: 'network-only',
    });
    return {
        lesson: data?.lesson,
        loading,
        error: Boolean(error),
    };
}
