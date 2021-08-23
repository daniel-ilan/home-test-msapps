import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import AllShowsScreen from '../screens/AllShowsScreen';
import ShowDescription from '../screens/ShowDescription';
import NotFoundScreen from '../screens/NotFoundScreen';
import QRCodeScanner from '../components/QRCodeScanner';
import { RootStackParamList } from '../types';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name='Root'
        component={AllShowsScreen}
        options={{ title: 'Shows' }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name='ShowDescription'
        component={ShowDescription}
        options={{ title: 'Description' }}
      />
      <Stack.Screen
        name='QRCodeScanner'
        component={QRCodeScanner}
        options={{ title: 'Add Show' }}
      />
    </Stack.Navigator>
  );
}
