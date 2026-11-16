import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Mila Trending Bar */}
        <View style={styles.trendingBar}>
          <View style={styles.mapIconContainer}>
             <Ionicons name="location" size={24} color="#4CAF50" />
          </View>
          <View>
            <Text style={styles.trendingTitle}>Mila trending now</Text>
            <Text style={styles.trendingSub}>🟢 4,856 Mila users now</Text>
          </View>
        </View>

        {/* Trend Reels */}
        <View style={styles.reelsSection}>
          <Text style={styles.sectionTitle}>Trend Reels</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reelsScroll}>
            {['Reels · Mila Cafés', 'Reels · Night Market', 'Reels · Mountains', 'Reels · Crafts'].map((item, index) => (
              <View key={index} style={styles.reelItem}>
                <View style={styles.reelImagePlaceholder}>
                  <Ionicons name="play" size={20} color="#FFF" />
                </View>
                <Text style={styles.reelText}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Main Feed (Posts + Stories) */}
        <View style={styles.mainContent}>
          {/* Posts Column (Left) */}
          <View style={styles.postsColumn}>
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} style={styles.avatar} />
                <Text style={styles.username}>lena._</Text>
                <Ionicons name="checkmark-circle" size={16} color="#9C27B0" />
              </View>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' }} style={styles.postImage} />
              <View style={styles.postActions}>
                <Text style={styles.actionText}>💬 324 comments</Text>
                <Text style={styles.actionText}>✨ 12.4k sparkle</Text>
              </View>
              <Text style={styles.postCaption}>Cozy mornings</Text>
            </View>

            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: 'https://i.pravatar.cc/100?img=8' }} style={styles.avatar} />
                <Text style={styles.username}>kai.photo</Text>
                <Ionicons name="checkmark-circle" size={16} color="#9C27B0" />
              </View>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1514565131-fce0801e5785' }} style={styles.postImage} />
              <Text style={styles.postCaption}>New York vibes</Text>
            </View>
          </View>

          {/* Stories Column (Right) */}
          <View style={styles.storiesColumn}>
            <View style={styles.storyItem}>
              <View style={styles.storyCircleAdd}>
                <Ionicons name="add" size={24} color="#FFF" />
              </View>
              <Text style={styles.storyName}>Your Story</Text>
            </View>
            {['lena._', 'kai.photo', 'mira.day', 'zara.art'].map((name, i) => (
              <View key={i} style={styles.storyItem}>
                <View style={styles.storyCircle}>
                  <Image source={{ uri: 'https://i.pravatar.cc/100?img=' + (i+10) }} style={styles.storyImage} />
                </View>
                <Text style={styles.storyName}>{name}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* زر النشر العائم (Floating Action Button) */}
      <TouchableOpacity style={styles.floatingPostBtn} onPress={() => navigation.navigate('CreatePost')}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' },
  scrollContent: { paddingBottom: 100 },
  trendingBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', margin: 15, padding: 15, borderRadius: 20 },
  mapIconContainer: { backgroundColor: '#E8F5E9', padding: 10, borderRadius: 15, marginRight: 15 },
  trendingTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  trendingSub: { fontSize: 12, color: '#666', marginTop: 3 },
  reelsSection: { backgroundColor: '#FFF', marginHorizontal: 15, padding: 15, borderRadius: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  reelsScroll: { marginTop: 10 },
  reelItem: { marginRight: 15, alignItems: 'center', width: 70 },
  reelImagePlaceholder: { width: 70, height: 70, borderRadius: 15, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  reelText: { fontSize: 10, textAlign: 'center', color: '#333' },
  mainContent: { flexDirection: 'row', paddingHorizontal: 15, marginTop: 15 },
  postsColumn: { flex: 1, marginRight: 10 },
  postCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 30, height: 30, borderRadius: 15, marginRight: 8 },
  username: { fontWeight: 'bold', fontSize: 14, marginRight: 5 },
  postImage: { width: '100%', height: 200, borderRadius: 15, marginBottom: 10 },
  postActions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  actionText: { fontSize: 12, color: '#555' },
  postCaption: { fontSize: 14, fontWeight: '500' },
  storiesColumn: { width: 100 },
  storyItem: { alignItems: 'center', marginBottom: 15, backgroundColor: '#FFF', padding: 10, borderRadius: 20 },
  storyCircleAdd: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#D1C4E9', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  storyCircle: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#FFB6C1', padding: 2, marginBottom: 5 },
  storyImage: { width: '100%', height: '100%', borderRadius: 25 },
  storyName: { fontSize: 11, textAlign: 'center' },
  
  // 🟣 زر النشر العائم
  floatingPostBtn: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
});
