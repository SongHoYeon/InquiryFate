import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, 
  Text, 
  View } from 'react-native';

import MenuScreen from './pages/MenuScreen';
import SearchScreen from './pages/SearchScreen';
import DatabaseScreen from './pages/DatabaseScreen';
import CalendarScreen from './pages/CalendarScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MenuStack() {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
          headerStyle: { backgroundColor: '#42f44b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ 
            title: '메뉴' ,
            headerShown: false,
          }}
      />
      <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: '만세력 조회' }}
      />
      <Stack.Screen
          name="Database"
          component={DatabaseScreen}
          options={{ title: 'Database' }}
      />
       <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: '달력' }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      
      screenOptions={{
          headerStyle: { backgroundColor: '#42f44b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ title: 'Menu Page' }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Search Page' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
          initialRouteName="Menu"
          tabBarOptions={{
            activeTintColor: '#42d400',
          }}>
          <Tab.Screen
              name="Home"
              component={MenuStack}        
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
