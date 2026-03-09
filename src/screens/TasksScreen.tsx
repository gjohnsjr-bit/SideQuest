import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TasksScreen = ({ playerData }) => {
  const [tasks, setTasks] = useState([]);
  const [playerState, setPlayerState] = useState(playerData);

  const defaultTasks = [
    { id: '1', title: 'Workout', category: 'Health', xp: 50, completed: false },
    { id: '2', title: 'Prepare a Healthy Meal', category: 'Health', xp: 40, completed: false },
    { id: '3', title: 'Do Laundry', category: 'Chores', xp: 30, completed: false },
    { id: '4', title: 'Pay Monthly Bills', category: 'Finance', xp: 100, completed: false },
    { id: '5', title: 'Budget Review', category: 'Finance', xp: 60, completed: false },
    { id: '6', title: 'Get 8 Hours of Sleep', category: 'Health', xp: 50, completed: false },
    { id: '7', title: 'Clean Living Space', category: 'Chores', xp: 40, completed: false },
    { id: '8', title: 'Grocery Shopping', category: 'Chores', xp: 35, completed: false },
  ];

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        await AsyncStorage.setItem('tasks', JSON.stringify(defaultTasks));
        setTasks(defaultTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const completeTask = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Update player data
    const task = tasks.find(t => t.id === taskId);
    const updatedPlayer = {
      ...playerState,
      xp: playerState.xp + task.xp,
      coins: playerState.coins + Math.floor(task.xp / 10),
      tasksCompleted: playerState.tasksCompleted + 1,
    };

    // Check for level up
    if (updatedPlayer.xp >= updatedPlayer.maxXp) {
      updatedPlayer.level += 1;
      updatedPlayer.xp -= updatedPlayer.maxXp;
      updatedPlayer.maxXp = Math.floor(updatedPlayer.maxXp * 1.15);
    }

    setPlayerState(updatedPlayer);
    await AsyncStorage.setItem('playerData', JSON.stringify(updatedPlayer));
  };

  const resetTasks = async () => {
    await AsyncStorage.setItem('tasks', JSON.stringify(defaultTasks));
    setTasks(defaultTasks);
  };

  const renderTask = ({ item }) => (
    <View style={[styles.taskCard, item.completed && styles.completedTask]}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskCategory}>{item.category}</Text>
        <Text style={styles.taskXp}>{item.xp} XP</Text>
      </View>
      <TouchableOpacity
        style={[styles.completeButton, item.completed && styles.completedButton]}
        onPress={() => !item.completed && completeTask(item.id)}
        disabled={item.completed}
      >
        <Text style={styles.buttonText}>{item.completed ? '✓' : 'Do'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quests</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        style={styles.taskList}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.resetButton} onPress={resetTasks}>
        <Text style={styles.resetButtonText}>Reset Daily Tasks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  taskList: {
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
  taskCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedTask: {
    backgroundColor: '#f0f0f0',
    opacity: 0.7,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  taskXp: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  completedButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#ff9800',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TasksScreen;