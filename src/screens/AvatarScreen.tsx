import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';

const AvatarScreen = ({ playerData }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(playerData?.avatar || 'avatar1');

  const avatars = [
    { id: 'avatar1', name: 'Knight', emoji: '🛡️', unlocked: true },
    { id: 'avatar2', name: 'Mage', emoji: '🧙', unlocked: playerData?.level >= 3 },
    { id: 'avatar3', name: 'Archer', emoji: '🏹', unlocked: playerData?.level >= 5 },
    { id: 'avatar4', name: 'Paladin', emoji: '⚔️', unlocked: playerData?.level >= 7 },
    { id: 'avatar5', name: 'Dragon', emoji: '🐉', unlocked: playerData?.level >= 10 },
  ];

  const renderAvatar = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.avatarCard,
        selectedAvatar === item.id && styles.selectedCard,
        !item.unlocked && styles.lockedCard,
      ]}
      onPress={() => item.unlocked && setSelectedAvatar(item.id)}
      disabled={!item.unlocked}
    >
      <Text style={styles.avatarEmoji}>{item.emoji}</Text>
      <Text style={styles.avatarName}>{item.name}</Text>
      {!item.unlocked && <Text style={styles.lockedText}>Level {avatars.indexOf(item) * 2 + 1}+</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Avatar</Text>
      </View>

      <View style={styles.currentAvatarContainer}>
        <Text style={styles.currentAvatarEmoji}>
          {avatars.find(a => a.id === selectedAvatar)?.emoji}
        </Text>
        <Text style={styles.currentAvatarName}>
          {avatars.find(a => a.id === selectedAvatar)?.name}
        </Text>
        <Text style={styles.levelText}>Level {playerData?.level}</Text>
      </View>

      <Text style={styles.sectionTitle}>Choose Your Avatar</Text>

      <FlatList
        data={avatars}
        renderItem={renderAvatar}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.section}>
        <Text style={styles.infoTitle}>Customization Tips</Text>
        <Text style={styles.infoText}>
          • Unlock new avatars by leveling up{\n}
          • Each avatar has unique properties{\n}
          • Change your avatar anytime
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
  currentAvatarContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentAvatarEmoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  currentAvatarName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  levelText: {
    fontSize: 16,
    color: '#6200ee',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#333',
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  avatarCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#6200ee',
  },
  lockedCard: {
    opacity: 0.5,
  },
  avatarEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  avatarName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  lockedText: {
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
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default AvatarScreen;