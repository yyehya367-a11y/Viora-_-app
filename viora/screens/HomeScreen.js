import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}><Text style={styles.headerTitle}>V I O R A</Text></View>
        <View style={styles.trendingBar}>
          <Ionicons name="location" size={24} color="#4CAF50" />
          <Text style={styles.trendingTitle}>Mila trending now</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stories}>
          {['Your Story', 'lena._', 'kai.photo', 'mira.day'].map((name, i) => (
            <View key={i} style={styles.storyItem}>
              <Image source={{ uri: 'https://i.pravatar.cc/100?img=' + (i+1) }} style={styles.storyImage} />
              <Text style={styles.storyName}>{name}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} style={styles.avatar} />
            <Text style={styles.username}>lena._</Text>
          </View>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' }} style={styles.postImage} />
          <Text style={styles.postCaption}>Cozy mornings ☕</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' },
  scrollContent: { paddingBottom: 100 },
  header: { padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', letterSpacing: 4 },
  trendingBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', margin: 15, padding: 15, borderRadius: 20 },
  trendingTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  stories: { paddingLeft: 15, marginBottom: 15 },
  storyItem: { alignItems: 'center', marginRight: 15 },
  storyImage: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#9C27B0' },
  storyName: { fontSize: 12, marginTop: 5 },
  postCard: { backgroundColor: '#FFF', marginHorizontal: 15, borderRadius: 20, padding: 15, marginBottom: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  username: { fontWeight: 'bold' },
  postImage: { width: '100%', height: 250, borderRadius: 15, marginBottom: 10 },
  postCaption: { fontSize: 14 },
});
