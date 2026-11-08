import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LOCATE_SIZE } from '../theme';
export function LocateButton({
  onPress
}) {
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Ir a mi ubicación" style={styles.btn}><Ionicons name="navigate" size={20} color="#fff" /></Pressable>;
}
const styles = StyleSheet.create({
  btn: {
    width: LOCATE_SIZE,
    height: LOCATE_SIZE,
    borderRadius: LOCATE_SIZE / 2,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
