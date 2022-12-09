import { useQuery } from '@apollo/client';
import { SKILLS_QUERY, LESSONS_QUERY } from './queries';

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
