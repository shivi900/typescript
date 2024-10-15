import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { RadioButton, Text } from 'react-native-paper';
import { listZellerCustomers } from './mock-server/queries/listZellerCustomers';

export const LIST_USERS_QUERY = gql
  query ListZellerCustomers($role: String!) {
    listZellerCustomers(filter: { role: { eq: $role } }) {
      items {
        id
        name
        role
      }
    }
  }
;


const UserItem = ({ user }: any) => (
    <View style={{ flexDirection: 'row', padding: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
        <Text> - {user.role}</Text>
    </View>
);

const UserScreen = () => {
    const [selectedRole, setSelectedRole] = useState('Admin');

    const { loading, error, data } = useQuery(LIST_USERS_QUERY, {
        variables: { role: selectedRole },
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <RadioButton.Group onValueChange={value => setSelectedRole(value)} value={selectedRole}>
                    <RadioButton.Item label="Admin" value="Admin" />
                    <RadioButton.Item label="Manager" value="Manager" />
                </RadioButton.Group>
            </View>

            <FlatList
                data={data?.listZellerCustomers?.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <UserItem user={item} />}
            />
        </View>
    );
};

export default UserScreen;
