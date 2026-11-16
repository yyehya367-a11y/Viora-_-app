import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ReelsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trend Reels</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Reels Content */}
      <View style={styles.reelContainer}>
        {/* Background Image (Video Placeholder) */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800' }} 
          style={styles.video} 
          resizeMode="cover"
        />

        {/* Gradient Overlay (Bottom) */}
        <View style={styles.overlay} />

        {/* Right Side Actions */}
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="heart" size={32} color="#FFF" />
            <Text style={styles.actionText}>12.4K</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="chatbubble" size={30} color="#FFF" />
            <Text style={styles.actionText}>324</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="paper-plane" size={30} color="#FFF" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <View style={styles.userInfo}>
            <Image source={{ uri: 'https://i.pravatar.cc/100?img=8' }} style={styles.avatar} />
            <Text style={styles.username}>kai.photo</Text>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>متابعة</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.caption}>Night city walk 🌃</Text>
          <Text style={styles.audio}>🎵 Original audio - kai.photo</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, position: 'absolute', top: 40, left: 0, right: 0, zIndex: 10 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  reelContainer: { flex: 1, justifyContent: 'flex-end' },
  video: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  rightActions: { position: 'absolute', right: 15, bottom: 100, alignItems: 'center' },
  actionBtn: { alignItems: 'center', marginBottom: 20 },
  actionText: { color: '#FFF', fontSize: 12, marginTop: 5, fontWeight: 'bold' },
  bottomInfo: { padding: 20, paddingBottom: 40 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#FFF', marginRight: 10 },
  username: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 10 },
  followBtn: { borderWidth: 1, borderColor: '#FFF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5 },
  followText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  caption: { color: '#FFF', fontSize: 14, marginBottom: 5 },
  audio: { color: '#DDD', fontSize: 12 },
})
