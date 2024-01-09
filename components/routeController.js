import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './homeScreen';
import { DetailsScreen } from './detailsScreen';
import HyperBounceHome from './hyperHome';
import NetNaviScreen from "./netNaviScreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
    <Navigator screenOptions={{headerShown: false}}>
        <Screen name='NetNavi Home' component={HomeScreen}/>
        <Screen name='Details' component={DetailsScreen}/>
        <Screen name='Chat' component={NetNaviScreen}/>
        <Screen name='HyperBounce' component={HyperBounceHome}/>

    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator/>
    </NavigationContainer>

);