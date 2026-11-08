import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CATEGORY_BY_ID } from '../categories';
import { colors, fonts, radius } from '../theme';
export function BusinessMarker({
  business,
  selected
}) {
  const cat = CATEGORY_BY_ID[business.category];
  return <View style={[styles.pill, selected && styles.pillSelected]}><Text style={styles.emoji}>{cat.emoji}</Text><Text numberOfLines={1} style={[styles.name, selected && {
      color: '#fff'
    }]}>{business.name}</Text></View>;
}
const styles = StyleSheet.create({
  pill: {
    maxWidth: 190,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.chip,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 3
  },
  pillSelected: {
    backgroundColor: colors.navy,
    transform: [{
      scale: 1.08
    }]
  },
  emoji: {
    fontSize: 15
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.navy,
    flexShrink: 1
  }
});
