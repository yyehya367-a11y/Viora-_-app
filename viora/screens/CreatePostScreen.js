import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase';

export default function CreatePostScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('تنبيه', 'لازم تعطي صلاحية الوصول للصور');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!image) {
      Alert.alert('تنبيه', 'لازم تختار صورة أولاً');
      return;
    }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // 1. رفع الصورة
      const response = await fetch(image);
      const blob = await response.blob();
      const fileName = `${user.id}-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('avatars') // نستعملو نفس الخزانة مؤقتاً
        .upload(fileName, blob, { contentType: 'image/jpeg' });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName);

      // 2. حفظ المنشور في قاعدة البيانات
      const { error: dbError } = await supabase
        .from('posts')
        .insert([{ user_id: user.id, image_url: urlData.publicUrl, caption: caption }]);

      if (dbError) throw dbError;

      Alert.alert('نجاح', 'تم النشر!');
      navigation.goBack(); // يرجع للـ Feed
    } catch (error) {
      Alert.alert('خطأ', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>منشور جديد</Text>
        <TouchableOpacity onPress={handlePost} disabled={loading}>
          <Text style={styles.postBtn}>{loading ? '...' : 'نشر'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera" size={50} color="#9C27B0" />
            <Text style={styles.placeholderText}>اختر صورة</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="اكتب كابسيون..."
        placeholderTextColor="#999"
        value={caption}
        onChangeText={setCaption}
        multiline
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingTop: 40, borderBottomWidth: 1, borderColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  postBtn: { color: '#9C27B0', fontWeight: 'bold', fontSize: 16 },
  imagePicker: { width: '100%', height: 300, backgroundColor: '#F7E8E4', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  image: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center' },
  placeholderText: { color: '#9C27B0', marginTop: 10, fontSize: 16 },
  input: { padding: 20, fontSize: 16, textAlignVertical: 'top' },
});
