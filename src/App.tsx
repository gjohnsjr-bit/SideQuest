import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import AvatarScreen from './screens/AvatarScreen';
import AchievementsScreen from './screens/AchievementsScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    loadPlayerData();
  }, []);

  const loadPlayerData = async () => {
    try {
      const data = await AsyncStorage.getItem('playerData');
      if (data) {
        setPlayerData(JSON.parse(data));
      } else {
        const initialData = {
          name: 'Adventurer',
          level: 1,
          xp: 0,
          maxXp: 100,
          totalXp: 0,
          avatar: 'avatar1',
          coins: 0,
          tasksCompleted: 0,
          streakDays: 0,
          achievements: [],
          unlockedRewards: []
        };
        await AsyncStorage.setItem('playerData', JSON.stringify(initialData));
        setPlayerData(initialData);
      }
    } catch (error) {
      console.error('Error loading player data:', error);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen playerData={playerData} />;
      case 'tasks':
        return <TasksScreen playerData={playerData} />;
      case 'avatar':
        return <AvatarScreen playerData={playerData} />;
      case 'achievements':
        return <AchievementsScreen playerData={playerData} />;
      default:
        return <HomeScreen playerData={playerData} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.navButton}>
          <Text style={currentScreen === 'home' ? styles.activeNav : styles.inactiveNav}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('tasks')} style={styles.navButton}>
          <Text style={currentScreen === 'tasks' ? styles.activeNav : styles.inactiveNav}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('avatar')} style={styles.navButton}>
          <Text style={currentScreen === 'avatar' ? styles.activeNav : styles.inactiveNav}>Avatar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('achievements')} style={styles.navButton}>
          <Text style={currentScreen === 'achievements' ? styles.activeNav : styles.inactiveNav}>Achievements</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6200ee',
    paddingBottom: 10,
    paddingTop: 10,
  },
  navButton: {
    paddingHorizontal: 15,
  },
  activeNav: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inactiveNav: {
    color: '#ccc',
    fontSize: 16,
  },
});

export default App;