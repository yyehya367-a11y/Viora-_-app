import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>V I O R A</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput placeholder="Search Viora" style={styles.searchInput} placeholderTextColor="#999" />
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <Ionicons name="compass-outline" size={20} color="#4CAF50" />
            <Text style={styles.mapTitle}>Discover • Algeria</Text>
          </View>
          <Image source={{ uri: 'https://i.ibb.co/68s7Z1R/algeria-map.png' }} style={styles.mapImage} resizeMode="contain" />
          <View style={styles.trendingBadge}>
            <Ionicons name="location" size={16} color="#4CAF50" />
            <Text style={styles.trendingBadgeText}>Mila</Text>
          </View>
          <Text style={styles.mapBottomText}>Mila trending now</Text>
          <Text style={styles.mapBottomSub}>🟢 4,856 Mila users now • Live</Text>
        </View>

        {/* Trend Reels */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trend Reels</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See all {'>'}</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Mila Cafés', 'Night Market', 'Mountains', 'Crafts'].map((item, index) => (
              <View key={index} style={styles.reelItem}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200' }} style={styles.reelImage} />
                <Text style={styles.reelTitle}>{item}</Text>
                <Text style={styles.reelSub}>☕ {index * 20 + 76} reels</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Trending Grid */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>✨ Trending in Algeria</Text>
          <View style={styles.gridContainer}>
            <View style={styles.gridCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300' }} style={styles.gridImage} />
              <Text style={styles.gridUsername}>sara.cooks ✓</Text>
              <Text style={styles.gridInfo}>✨ Homemade Couscous • 1.2k sparks</Text>
            </View>
            <View style={styles.gridCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300' }} style={styles.gridImage} />
              <View style={styles.playIcon}><Ionicons name="play" size={20} color="#FFF" /></View>
              <Text style={styles.gridUsername}>rami.travels ✓</Text>
              <Text style={styles.gridInfo}>▶ Constantine Bridge • 3.4k • 24s</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' },
  scrollContent: { paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
  logoText: { fontSize: 24, fontWeight: 'bold', letterSpacing: 4, color: '#1A1A1A' },
  searchBar: { flexDirection: 'row', backgroundColor: '#FFF', padding: 10, borderRadius: 20, alignItems: 'center', width: '60%' },
  searchInput: { marginLeft: 10, flex: 1, color: '#333' },
  mapSection: { backgroundColor: '#FFF', margin: 15, padding: 20, borderRadius: 25, alignItems: 'center' },
  mapHeader: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 10 },
  mapTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 5 },
  mapImage: { width: '100%', height: 150, marginBottom: 10 },
  trendingBadge: { position: 'absolute', top: 70, right: 50, backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, flexDirection: 'row', alignItems: 'center' },
  trendingBadgeText: { color: '#4CAF50', fontWeight: 'bold', marginLeft: 5 },
  mapBottomText: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  mapBottomSub: { fontSize: 12, color: '#666', marginTop: 3 },
  sectionContainer: { backgroundColor: '#FFF', marginHorizontal: 15, marginBottom: 15, padding: 15, borderRadius: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  seeAll: { color: '#B39DDB', fontSize: 14 },
  reelItem: { marginRight: 15, width: 100 },
  reelImage: { width: 100, height: 100, borderRadius: 15, marginBottom: 5 },
  reelTitle: { fontSize: 12, fontWeight: 'bold' },
  reelSub: { fontSize: 10, color: '#666', marginTop: 2 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  gridCard: { width: '48%', marginBottom: 15, position: 'relative' },
  gridImage: { width: '100%', height: 120, borderRadius: 15, marginBottom: 5 },
  playIcon: { position: 'absolute', top: '40%', left: '40%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 25 },
  gridUsername: { fontSize: 12, fontWeight: 'bold' },
  gridInfo: { fontSize: 10, color: '#666' },
});
