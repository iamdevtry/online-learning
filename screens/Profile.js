import { useQuery, gql } from '@apollo/client';

import React from 'react';
import { View, Text } from 'react-native';

const GET_SKILSS = gql`
    query Skills {
        skills {
            id
            name
        }
    }
`;
const Profile = () => {
    const { loading, error, data } = useQuery(GET_SKILSS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error : {error.message}</Text>;
    console.log(data);
    return (
        <View>
            <Text>Profile</Text>
        </View>
    );
};

export default Profile;
