import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import AvatarScreen from './src/screens/AvatarScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tasks" component={TasksScreen} />
        <Tab.Screen name="Avatar" component={AvatarScreen} />
        <Tab.Screen name="Achievements" component={AchievementsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;