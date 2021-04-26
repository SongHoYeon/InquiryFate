import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import MenuScreen from './pages/MenuScreen';
import SearchScreen from './pages/SearchScreen';
import DatabaseScreen from './pages/DatabaseScreen';
import CalendarScreen from './pages/CalendarScreen';
import FateResultScreen from './pages/FateResultScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const MenuStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    title: '메뉴',
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
            <Stack.Screen
                name="FateResult"
                component={FateResultScreen}
                options={{ title: '만세력' }}
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
                }}
            >
                <Tab.Screen
                    name="Menu"
                    component={MenuStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
