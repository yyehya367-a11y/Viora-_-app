import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NOTIFS = [
  { id: '1', text: 'Nova: كيفاش نقدر نعاونك اليوم؟', icon: 'sparkles', color: '#9C27B0' },
  { id: '2', text: 'مرافق جديد: @lena._ رافقك', icon: 'person-add', color: '#4CAF50' },
  { id: '3', text: 'إعجاب: 12 شخص عجبهم لحظتك', icon: 'heart', color: '#FF5252' },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>الإشعارات</Text>
      <FlatList
        data={NOTIFS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notifItem}>
            <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={styles.notifText}>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' },
  header: { fontSize: 22, fontWeight: 'bold', margin: 20, marginTop: 40, color: '#1A1A1A' },
  notifItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 15, marginBottom: 10, padding: 15, borderRadius: 15 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  notifText: { flex: 1, fontSize: 14, color: '#333' },
});
