import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { RadioButton, Text } from 'react-native-paper';



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
const listZellerCustomers = {
    items: [
        {
            id: '1',
            name: 'Shivam',
            email: 'test1@test.com',
            role: 'Manager'
        },
        {
            id: '2',
            name: 'Rohan',
            email: 'test2@test.com',
            role: 'Admin'
        },
        {
            id: '3',
            name: 'Sahil',
            email: 'test3@test.com',
            role: 'Manager'
        },
        {
            id: '4',
            name: 'Rahul',
            email: 'test4@test.com',
            role: 'Admin'
        }
    ],
    nextToken: null
};


// const mocks = [
//     {
//       request: {
//         query: LIST_USERS_QUERY,
//         variables: { role: 'Admin' },
//       },
//       result: {
//         data: {
//           listZellerCustomers: {
//             items: [
//               { id: '1', name: 'TestCustomer1', role: 'Admin' },
//               { id: '2', name: 'TestCustomer2', role: 'Admin' },
//             ],
//           },
//         },
//       },
//     },
//     {
//       request: {
//         query: LIST_USERS_QUERY,
//         variables: { role: 'Manager' },
//       },
//       result: {
//         data: {
//           listZellerCustomers: {
//             items: [
//               { id: '3', name: 'TestCustomer3', role: 'Manager' },
//               { id: '4', name: 'TestCustomer4', role: 'Manager' },
//             ],
//           },
//         },
//       },
//     },
//   ];

const UserItem = ({ user }: any) => (
    <>
        <View style={styles.userContainer}>

            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            </View>


            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userRole}>{user.role}</Text>
            </View>
        </View>
    </>
);



const UserScreen = () => {
    const [selectedRole, setSelectedRole] = useState('Admin');

    const { loading, error, data } = useQuery(LIST_USERS_QUERY, {
        variables: { role: selectedRole },
    });

    const filteredUsers = listZellerCustomers.items.filter((user) => user.role === selectedRole);
    console.log('data----', data?.listZellerCustomers?.items)
    if (loading) return <Text style={{ marginTop: 200 }}>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={{ padding: 20 }}>

            <View style={{ marginTop: 200 }}>

                <Text style={{ fontWeight: 'bold', fontSize: 28 }}>User Types </Text>
                {/* <RadioButton.Group
          onValueChange={(newValue) => setSelectedRole(newValue as 'Admin' | 'Manager')}
          value={selectedRole}
        >
          <View style={styles.radioGroup}>
            <RadioButton.Item label="Admin" value="Admin" />
            <RadioButton.Item label="Manager" value="Manager" />
          </View>
        </RadioButton.Group> */}

                <TouchableOpacity onPress={() => setSelectedRole('Admin')}>
                    <Text style={{ marginRight: 10, color: selectedRole === 'Admin' ? 'blue' : 'black', fontSize: 24 }}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedRole('Manager')}>
                    <Text style={{ color: selectedRole === 'Manager' ? 'blue' : 'black', fontSize: 24 }}>Manager</Text>
                </TouchableOpacity>
            </View>
            {console.log('logg---->>', data?.listZellerCustomers?.items)}
            <View style={{ marginLeft: 16 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 80, fontSize: 28 }}> {selectedRole} Users </Text>

                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <UserItem user={item} />}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        height: 50,
        width: 50,

        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#1E88E5',
    },
    userInfo: {
        flexDirection: 'column',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    userRole: {
        marginTop: 5,
        fontSize: 14,
        color: '#666',
    },
});

export default UserScreen;
