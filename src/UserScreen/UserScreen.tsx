import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { Text } from 'react-native-paper';
import { LIST_USERS_QUERY } from '../mock-server/queries/listZellerCustomers'
import { styles } from './styles'

const UserItem = ({ user }: any) => (

    <View style={styles.userContainer}>
        <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role}</Text>
        </View>
    </View>

);


const UserScreen = () => {
    const [selectedRole, setSelectedRole] = useState('Admin');

    const { loading, error, data } = useQuery(LIST_USERS_QUERY, {
        variables: { role: selectedRole.toUpperCase() },
    });
    if (loading) return <Text style={{ marginTop: 200 }}>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={{ padding: 20 }}>
            <View style={{ marginTop: 200 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 28 }}>User Types </Text>
                <TouchableOpacity onPress={() => setSelectedRole('Admin')}>
                    <Text style={{ marginRight: 10, color: selectedRole === 'Admin' ? 'blue' : 'black', fontSize: 24 }}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedRole('Manager')}>
                    <Text style={{ color: selectedRole === 'Manager' ? 'blue' : 'black', fontSize: 24 }}>Manager</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 16 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 80, fontSize: 28 }}> {selectedRole} Users </Text>

                <FlatList
                    data={data?.listZellerCustomers?.items}
                    style={{ marginTop: 40 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <UserItem user={item} />}
                />
            </View>
        </View>
    );
};


export default UserScreen;
