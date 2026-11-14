import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CHATS = [
  { id: '1', name: 'Nova Mind IA', msg: 'كيفاش نقدر نعاونك اليوم؟', time: 'الآن', isNova: true, online: true },
  { id: '2', name: 'lena._', msg: 'شكرا على الإعجاب! 🌸', time: '10:30', isNova: false, online: true },
  { id: '3', name: 'kai.photo', msg: 'صورة جديدة في الـ Feed', time: 'أمس', isNova: false, online: false },
  { id: '4', name: 'Mila Group', msg: 'مرحبا بيكم في القروب', time: 'أمس', isNova: false, online: false },
];

const PulseDot = ({ online }) => {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (online) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [online, scale]);
  if (!online) return null;
  return <Animated.View style={[styles.pulseDot, { transform: [{ scale }] }]} />;
};

const NovaFloatingButton = ({ onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [scale]);
  return (
    <Animated.View style={[styles.floatingBtnContainer, { transform: [{ scale }] }]}>
      <TouchableOpacity style={styles.floatingBtn} onPress={onPress} activeOpacity={0.8}>
        <Ionicons name="sparkles" size={28} color="#FFF" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ChatsListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الرسائل</Text>
        <TouchableOpacity style={styles.newChatBtn}>
          <Ionicons name="create-outline" size={24} color="#9C27B0" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => item.isNova ? navigation.navigate('NovaChat') : null}>
            <View style={[styles.avatarContainer, item.isNova && { backgroundColor: '#E8D5FF' }]}>
              {item.isNova ? <Text style={{ fontSize: 24 }}>🤖</Text> : <Image source={{ uri: 'https://i.pravatar.cc/100?img=' + item.id }} style={styles.avatar} />}
              <PulseDot online={item.online} />
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <Text style={styles.chatMsg} numberOfLines={1}>{item.msg}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <NovaFloatingButton onPress={() => navigation.navigate('NovaChat')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  newChatBtn: { padding: 5 },
  chatItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 15, marginBottom: 10, padding: 15, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  avatarContainer: { width: 55, height: 55, borderRadius: 27.5, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatar: { width: '100%', height: '100%', borderRadius: 27.5 },
  pulseDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#FFF' },
  chatInfo: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  chatName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  chatTime: { fontSize: 12, color: '#999' },
  chatMsg: { fontSize: 14, color: '#666' },
  floatingBtnContainer: { position: 'absolute', bottom: 100, right: 20 },
  floatingBtn: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#9C27B0', justifyContent: 'center', alignItems: 'center', shadowColor: '#9C27B0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.8, shadowRadius: 15, elevation: 10 },
});
