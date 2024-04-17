// MY CODE HERE

import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

// jest mock for navigation container due to error received
jest.mock('@react-navigation/native', () => ({
    NavigationContainer: ({ children }) => <>{children}</>,
}));

// test homescreen renders
test('HomeScreen renders without errors', () => {
const { getByText } = render(
    <NavigationContainer>
    <HomeScreen />
    </NavigationContainer>
);
const lookingForText = getByText('Looking for things to do on your trip?');
expect(lookingForText).toBeTruthy();
});

// MY CODE ENDS HERE
