import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, Image, TouchableOpacity, 
ScrollView, SafeAreaView, Dimensions, Alert } from 
'react-native'; import { Ionicons } from 
'@expo/vector-icons'; import { supabase } from 
'../supabase';
nano screens/ProfileScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase';

const { width } = Dimensions.get('window');
const imageSize = width / 3;

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/150?img=11');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user?.user_metadata?.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url);
      }
    };
    getUser();
  }, []);

  const pickImage = async () => {
    // 1. نطلب الصلاحية
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('تنبيه', 'لازم تعطي صلاحية الوصول للصور');
      return;
    }

    // 2. نفتحو المعرض ونختارو صورة
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      // 3. نرفعو الصورة لـ Supabase Storage
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = `${user.id}-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, { contentType: 'image/jpeg' });

      if (uploadError) throw uploadError;

      // 4. نجيبو الرابط تاع الصورة
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      
      // 5. نحفظو الرابط في حساب المستخدم
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl }
      });

      if (updateError) throw updateError;

      setAvatarUrl(data.publicUrl);
      Alert.alert('نجاح', 'تم تحديث الصورة!');

    } catch (error) {
      Alert.alert('خطأ', error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    Alert.alert('تسجيل الخروج', 'راك رايح تخرج من الحساب');
  };

  const POSTS = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785',
    'https://images.unsplash.com/photo-1547592180-85f173990554',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>@{user ? user.email.split('@')[0] : 'Benmouusling'}</Text>
          <TouchableOpacity onPress={handleLogout}>
             <Ionicons name="log-out-outline" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <View style={styles.glassCard}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={pickImage}>
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={16} color="#FFF" />
              </View>
            </TouchableOpacity>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Adem Benzahra</Text>
              <Ionicons name="checkmark-circle" size={18} color="#FFD700" />
              <Text style={styles.founderTag}>المؤسس</Text>
            </View>
            <Text style={styles.username}>@{user ? user.email.split('@')[0] : 'Benmouusling'}</Text>
            <Text style={styles.bioText}>مؤسس Viora 🇩🇿 | من ميلة | نحو العالمية 🚀</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>المنشورات</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>مرافقين</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>يرافق</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editBtn} onPress={pickImage}>
              <Text style={styles.editBtnText}>تعديل الصورة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>مشاركة</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.gridContainer}>
          {POSTS.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.gridImage} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E8E4' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#9C27B0' },
  cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#9C27B0', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  nameContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginRight: 5 },
  founderTag: { fontSize: 10, color: '#FFD700', marginLeft: 5, fontWeight: 'bold', backgroundColor: '#333', paddingHorizontal: 5, borderRadius: 5 },
  username: { fontSize: 14, color: '#666', marginBottom: 10 },
  bioText: { fontSize: 14, color: '#333', textAlign: 'center', fontStyle: 'italic' },
  
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingVertical: 15 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  statLabel: { fontSize: 12, color: '#666' },
  
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  editBtn: { flex: 1, backgroundColor: '#9C27B0', padding: 12, borderRadius: 15, alignItems: 'center', marginRight: 10 },
  editBtnText: { color: '#FFF', fontWeight: 'bold' },
  shareBtn: { flex: 1, backgroundColor: 'rgba(156, 39, 176, 0.1)', padding: 12, borderRadius: 15, alignItems: 'center' },
  shareBtnText: { color: '#9C27B0', fontWeight: 'bold' },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, paddingBottom: 100 },
  gridImage: { width: imageSize, height: imageSize, margin: 1, borderRadius: 10 },
});
