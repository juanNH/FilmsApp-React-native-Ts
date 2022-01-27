import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './../screens/HomeScreen';
import DetailScreen from './../screens/DetailScreen';
import {Movie} from '../interfaces/MovieInterface';

export type RootStackParams = {
  HomeScreen: undefined,
  DetailScreen: Movie,
};

const Stack = createNativeStackNavigator<RootStackParams>();

const NavigationController = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default NavigationController;
