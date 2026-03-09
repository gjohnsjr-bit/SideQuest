import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ playerData }) => {
  if (!playerData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const xpPercentage = (playerData.xp / playerData.maxXp) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SideQuest</Text>
        <Text style={styles.subtitle}>Level {playerData.level} Adventurer</Text>
      </View>

      <View style={styles.playerCard}>
        <Text style={styles.playerName}>{playerData.name}</Text>
        <Text style={styles.xpText}>XP: {playerData.xp} / {playerData.maxXp}</Text>
        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: `${xpPercentage}%` }]} />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{playerData.coins}</Text>
          <Text style={styles.statLabel}>Gold Coins</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{playerData.tasksCompleted}</Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{playerData.streakDays}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Welcome to SideQuest!</Text>
        <Text style={styles.sectionText}>
          Transform your everyday adult responsibilities into epic quests. Complete tasks, earn experience points, level up your avatar, and unlock exclusive in-app rewards!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionText}>
          • Complete tasks to earn XP{'\n'}
          • Reach level milestones{'
'}
          • Unlock avatar customizations{'
'}
          • Earn badges and achievements{'
'}
          • Redeem rewards with coins
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  playerCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  xpText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  xpBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#6200ee',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ee',
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

export default HomeScreen;