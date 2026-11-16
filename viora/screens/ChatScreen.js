import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ route, navigation }) {
  const { name } = route.params || { name: 'lena._' }; 
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { id: 1, text: 'مرحبا! كيفاش راك؟', sender: 'them' },
    { id: 2, text: 'راني مليح، شكرا!', sender: 'me' },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setChat([...chat, { id: Date.now(), text: message, sender: 'me' }]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header (متناسق مع باقي الصفحات) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={styles.dot} />
             <Text style={styles.headerStatus}>نشط الآن</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="call" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Chat Area (خلفية وردية) */}
      <ScrollView contentContainerStyle={styles.chatArea}>
        {chat.map((msg) => (
          <View key={msg.id} style={[styles.bubble, msg.sender === 'me' ? styles.myBubble : styles.theirBubble]}>
            <Text style={msg.sender === 'me' ? styles.myText : styles.theirText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Area (زجاجية مع أزرار) */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputArea}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="camera-outline" size={24} color="#9C27B0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="image-outline" size={24} color="#9C27B0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="happy-outline" size={24} color="#9C27B0" />
        </TouchableOpacity>
        <TextInput 
          value={message} 
          onChangeText={setMessage} 
          placeholder="رسالة..." 
          style={styles.input} 
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="mic-outline" size={24} color="#9C27B0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' }, // نفس خلفية التطبيق
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingTop: 40, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  headerInfo: { flex: 1, marginLeft: 15 },
  headerName: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 5 },
  headerStatus: { fontSize: 12, color: '#4CAF50', fontWeight: 'bold' },
  chatArea: { padding: 15, paddingBottom: 20 },
  bubble: { padding: 12, borderRadius: 20, marginBottom: 10, maxWidth: '80%' },
  myBubble: { alignSelf: 'flex-end', backgroundColor: '#9C27B0', borderBottomRightRadius: 5 },
  theirBubble: { alignSelf: 'flex-start', backgroundColor: '#FFF', borderBottomLeftRadius: 5, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  myText: { color: '#FFF', fontSize: 15 },
  theirText: { color: '#333', fontSize: 15 },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.95)', paddingBottom: 30, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  iconBtn: { padding: 5, marginHorizontal: 2 },
  input: { flex: 1, backgroundColor: '#F0F0F0', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 5, maxHeight: 100 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#9C27B0', justifyContent: 'center', alignItems: 'center', marginLeft: 5 },
});
