import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, fonts, HEADER_HEIGHT, radius } from '../theme';
import { useMapStore } from '../store';
export function MapHeader({
  fullness
}) {
  const insets = useSafeAreaInsets();
  const query = useMapStore(s => s.query);
  const setQuery = useMapStore(s => s.setQuery);
  // Fondo sólido que aparece cuando un sheet llega arriba
  const bgStyle = useAnimatedStyle(() => ({
    opacity: fullness.value
  }));
  return <View pointerEvents="box-none" style={[styles.wrap, {
    paddingTop: insets.top + 8
  }]}><Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, {
      backgroundColor: colors.sheet
    }, bgStyle]} /><View style={styles.row}><View style={styles.logo}><Text style={styles.logoText}>s</Text></View><View style={styles.search}><Ionicons name="search" size={18} color="#fff" /><TextInput value={query} onChangeText={setQuery} placeholder="buscar" placeholderTextColor="rgba(255,255,255,0.85)" style={styles.input} returnKeyType="search" autoCorrect={false} /></View><Image source={{
        uri: 'https://i.pravatar.cc/100?img=68'
      }} style={styles.avatar} /></View></View>;
}
const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
    zIndex: 50,
    elevation: 50
  },
  row: {
    height: HEADER_HEIGHT - 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.emerald,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: 22,
    marginTop: -2
  },
  search: {
    flex: 1,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  input: {
    flex: 1,
    color: '#fff',
    fontFamily: fonts.medium,
    fontSize: 16,
    padding: 0
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000'
  }
});
