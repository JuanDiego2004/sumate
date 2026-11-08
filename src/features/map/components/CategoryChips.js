import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { CATEGORIES } from '../categories';
import { CHIPS_HEIGHT, colors, fonts, radius } from '../theme';
import { useMapStore } from '../store';
const ITEMS = [{
  id: 'all',
  label: 'todo',
  emoji: '✨'
}, ...CATEGORIES];
export function CategoryChips() {
  const category = useMapStore(s => s.category);
  const setCategory = useMapStore(s => s.setCategory);
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>{ITEMS.map(c => {
      const active = c.id === category;
      return <Pressable onPress={() => setCategory(c.id)} style={[styles.chip, active && styles.chipActive]} key={c.id}><Text style={styles.emoji}>{c.emoji}</Text><Text style={[styles.label, active && {
          color: '#fff'
        }]}>{c.label}</Text></Pressable>;
    })}</ScrollView>;
}
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center'
  },
  chip: {
    height: CHIPS_HEIGHT,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.chip,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 3
  },
  chipActive: {
    backgroundColor: colors.navy
  },
  emoji: {
    fontSize: 16
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.navy
  }
});
