import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import UserScreen from '../src/UserScreen';  // Your MainApp component
import { LIST_USERS_QUERY } from '../src/UserScreen';  // The query used in MainApp

// Mock response for the GraphQL query
const mockAdminUsers = {
  request: {
    query: LIST_USERS_QUERY,
    variables: { role: 'Admin' },
  },
  result: {
    data: {
      listZellerCustomers: {
        items: [
          { id: '1', name: 'John Smith', role: 'Admin' },
          { id: '2', name: 'Adam Muller', role: 'Admin' },
        ],
      },
    },
  },
};

const mockManagerUsers = {
  request: {
    query: LIST_USERS_QUERY,
    variables: { role: 'Manager' },
  },
  result: {
    data: {
      listZellerCustomers: {
        items: [
          { id: '3', name: 'Perri Smith', role: 'Manager' },
        ],
      },
    },
  },
};

describe('MainApp Component', () => {
  it('should render loading state initially', () => {
    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserScreen />
      </MockedProvider>
    );
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should render Admin users', async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={[mockAdminUsers]} addTypename={false}>
        <UserScreen />
      </MockedProvider>
    );

    // Wait for data to be loaded
    await waitFor(() => expect(queryByText('John Smith')).toBeTruthy());

    // Check if Admin users are rendered
    expect(getByText('John Smith')).toBeTruthy();
    expect(getByText('Adam Muller')).toBeTruthy();
  });

  it('should render Manager users after clicking the Manager button', async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={[mockAdminUsers, mockManagerUsers]} addTypename={false}>
        <UserScreen />
      </MockedProvider>
    );

    // Wait for Admin users to be loaded
    await waitFor(() => expect(queryByText('John Smith')).toBeTruthy());

    // Now simulate clicking the "Manager" button
    fireEvent.press(getByText('Manager'));

    // Wait for Manager users to be loaded
    await waitFor(() => expect(queryByText('Perri Smith')).toBeTruthy());

    // Check if Manager users are rendered and Admin users are no longer displayed
    expect(getByText('Perri Smith')).toBeTruthy();
    expect(queryByText('John Smith')).toBeNull();
  });

  it('should handle errors gracefully', async () => {
    const mockError = {
      request: {
        query: LIST_USERS_QUERY,
        variables: { role: 'Admin' },
      },
      error: new Error('Something went wrong'),
    };

    const { getByText } = render(
      <MockedProvider mocks={[mockError]} addTypename={false}>
        <UserScreen />
      </MockedProvider>
    );

    // Wait for the error to be displayed
    await waitFor(() => expect(getByText('Error: Something went wrong')).toBeTruthy());
  });
});
