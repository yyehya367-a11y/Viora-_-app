import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Cover */}
        <View style={styles.coverPhoto}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800' }} style={styles.coverImage} />
        </View>
        
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
             <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Adem Benzahra</Text>
            <Ionicons name="checkmark-circle" size={20} color="#FFD700" />
            <Text style={styles.founderTag}>المؤسس</Text>
          </View>
          <Text style={styles.username}>@Benmouusling</Text>
          <Text style={styles.bio}>مؤسس Viora 🇩🇿 | من ميلة | نحو العالمية 🚀</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>رافقني</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>مرافقين</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Sparkles</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>تعديل الملف</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Ionicons name="settings-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' },
  coverPhoto: { height: 150, width: '100%' },
  coverImage: { width: '100%', height: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  profileInfo: { alignItems: 'center', marginTop: -40 },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#F7E8E4', overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  nameContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  name: { fontSize: 20, fontWeight: 'bold', marginRight: 5 },
  founderTag: { fontSize: 10, color: '#FFD700', marginLeft: 5, fontWeight: 'bold', backgroundColor: '#333', paddingHorizontal: 5, borderRadius: 5 },
  username: { fontSize: 14, color: '#666', marginTop: 5 },
  bio: { fontSize: 14, textAlign: 'center', marginHorizontal: 20, marginTop: 10, color: '#333' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20, paddingHorizontal: 20 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#666' },
  actionButtons: { flexDirection: 'row', marginTop: 20, width: '80%', justifyContent: 'space-between' },
  editBtn: { flex: 1, backgroundColor: '#9C27B0', padding: 12, borderRadius: 15, alignItems: 'center', marginRight: 10 },
  editBtnText: { color: '#FFF', fontWeight: 'bold' },
  shareBtn: { backgroundColor: '#FFF', padding: 12, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
});
