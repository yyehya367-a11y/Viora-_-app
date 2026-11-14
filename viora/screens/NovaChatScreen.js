import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NovaChatScreen() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'ai', text: 'مرحبا! أنا Nova، المساعد الذكي لتطبيق Viora. كيفاش نقدر نعاونك اليوم؟ 🌷' }
  ]);
  const [loading, setLoading] = useState(false);

  // 🔑 المفتاح راهو مخبي في EAS، ما نحتاجوهش هنا
  const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { role: 'user', text: message };
    setChat(prev => [...prev, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `أنت Nova، المساعد الذكي الرسمي لتطبيق Viora. مطور التطبيق هو Adem Benzahra (Benmouusling) من ميلة، الجزائر. المستخدم يسقسيك: ${message}`
            }]
          }]
        })
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0].content) {
        setChat(prev => [...prev, { role: 'ai', text: data.candidates[0].content.parts[0].text }]);
      } else {
        setChat(prev => [...prev, { role: 'ai', text: "سمحلي، كاين مشكل في الاتصال. عاود جرب!" }]);
      }
    } catch (error) {
      setChat(prev => [...prev, { role: 'ai', text: 'سمحلي، صرالنا مشكل تقني.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <View style={styles.avatar}><Text style={{ fontSize: 24 }}>🤖</Text></View>
        <View>
          <Text style={styles.headerTitle}>Nova Mind IA</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={styles.dot} />
             <Text style={styles.headerSub}>نشط الآن</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.chatArea}>
        {chat.map((msg, i) => (
          <View key={i} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={msg.role === 'user' ? styles.userText : styles.aiText}>{msg.text}</Text>
          </View>
        ))}
        {loading && <Text style={{ textAlign: 'center', color: '#9C27B0', marginTop: 10 }}>Nova راهي تكتب...</Text>}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput value={message} onChangeText={setMessage} placeholder="اهدر مع Nova..." style={styles.input} placeholderTextColor="#999" />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE', paddingTop: 50 },
  avatar: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#E8D5FF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 5 },
  headerSub: { fontSize: 12, color: '#4CAF50', fontWeight: 'bold' },
  chatArea: { padding: 15, paddingBottom: 100 },
  bubble: { padding: 12, borderRadius: 20, marginBottom: 10, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#9C27B0', borderBottomRightRadius: 5 },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#FFF', borderBottomLeftRadius: 5 },
  userText: { color: '#FFF', fontSize: 15 },
  aiText: { color: '#333', fontSize: 15 },
  inputArea: { flexDirection: 'row', padding: 15, backgroundColor: '#FFF', position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 30 },
  input: { flex: 1, backgroundColor: '#F0F0F0', borderRadius: 25, paddingHorizontal: 15, height: 45 },
  sendBtn: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#9C27B0', justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
});
