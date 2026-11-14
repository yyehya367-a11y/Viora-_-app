import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabase'; // ربط السيرفر

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('تنبيه', 'لازم تكتب الإيميل والباسورد');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      Alert.alert('خطأ', error.message);
      setLoading(false);
    } else {
      setLoading(false);
      onLogin(); // يدخل للتطبيق
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>V</Text>
        <Text style={styles.title}>VIORA</Text>
        <Text style={styles.subtitle}>Welcome back to Nova</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
          <TextInput 
            placeholder="Email" 
            style={styles.input} 
            placeholderTextColor="#999" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
          <TextInput 
            placeholder="Password" 
            style={styles.input} 
            placeholderTextColor="#999" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginText}>{loading ? 'راهو يدخل...' : 'دخول'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signupText}>إنشاء حساب جديد</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAD0C4', justifyContent: 'center' },
  content: { paddingHorizontal: 30 },
  logo: { fontSize: 80, fontStyle: 'italic', fontWeight: '300', color: '#1A1A1A', textAlign: 'center' },
  title: { fontSize: 24, letterSpacing: 8, color: '#1A1A1A', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#A87B7B', textAlign: 'center', marginBottom: 40 },
  inputContainer: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 15, padding: 15, marginBottom: 15, alignItems: 'center' },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#333' },
  loginBtn: { backgroundColor: '#9C27B0', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  loginText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  signupBtn: { padding: 15, alignItems: 'center', marginTop: 10 },
  signupText: { color: '#9C27B0', fontWeight: 'bold' },
});
