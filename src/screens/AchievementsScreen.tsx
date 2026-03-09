import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

const AchievementsScreen = ({ playerData }) => {
  const [achievements, setAchievements] = useState([]);

  const allAchievements = [
    { id: '1', title: 'First Steps', description: 'Complete your first task', icon: '🎯', unlocked: playerData?.tasksCompleted >= 1 },
    { id: '2', title: 'On a Roll', description: 'Complete 5 tasks', icon: '🔥', unlocked: playerData?.tasksCompleted >= 5 },
    { id: '3', title: 'Unstoppable', description: 'Complete 20 tasks', icon: '⚡', unlocked: playerData?.tasksCompleted >= 20 },
    { id: '4', title: 'Level Up!', description: 'Reach level 2', icon: '📈', unlocked: playerData?.level >= 2 },
    { id: '5', title: 'Rising Star', description: 'Reach level 5', icon: '⭐', unlocked: playerData?.level >= 5 },
    { id: '6', title: 'Legend', description: 'Reach level 10', icon: '👑', unlocked: playerData?.level >= 10 },
    { id: '7', title: 'Wealthy', description: 'Earn 500 coins', icon: '💰', unlocked: playerData?.coins >= 500 },
    { id: '8', title: 'Consistent', description: 'Maintain a 7-day streak', icon: '📅', unlocked: playerData?.streakDays >= 7 },
  ];

  useEffect(() => {
    setAchievements(allAchievements);
  }, [playerData]);

  const renderAchievement = ({ item }) => (
    <View style={[styles.achievementCard, !item.unlocked && styles.lockedAchievement]}>
      <Text style={styles.achievementIcon}>{item.icon}</Text>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
      </View>
      {item.unlocked && <Text style={styles.unlockedBadge}>✓</Text>}
    </View>
  );

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.progress}>{unlockedCount} / {achievements.length}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(unlockedCount / achievements.length) * 100}%` }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round((unlockedCount / achievements.length) * 100)}% Complete
        </Text>
      </View>

      <FlatList
        data={achievements}
        renderItem={renderAchievement}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />

      <View style={styles.rewardsSection}>
        <Text style={styles.rewardsTitle}>Reward Unlocks</Text>
        <Text style={styles.rewardsText}>
          Earn achievements to unlock special in-app rewards such as avatar skins, customizations, and exclusive content!
        </Text>
      </View>
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
  progress: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
  },
  progressContainer: {
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
  progressBar: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  achievementCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedAchievement: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 13,
    color: '#999',
  },
  unlockedBadge: {
    fontSize: 24,
    color: '#4caf50',
  },
  rewardsSection: {
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
  rewardsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
  },
  rewardsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default AchievementsScreen;