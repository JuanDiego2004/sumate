import React, { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler'; // lista horizontal dentro del sheet
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { colors, fonts, radius } from '../theme';
import { useMapStore, useVisibleBusinesses } from '../store';
import { BusinessCard } from './BusinessCard';
const ROWS = [{
  key: 'trending',
  match: b => b.badge === 'trending'
}, {
  key: 'new',
  match: b => b.badge === 'new'
}, {
  key: 'best_price',
  match: b => b.badge === 'best_price'
}, {
  key: 'rest',
  match: b => !b.badge
}];
function FeedSheetView({
  sheetRef,
  animatedIndex,
  animatedPosition,
  topInset
}) {
  const {
    width,
    height
  } = useWindowDimensions();
  const snapPoints = useMemo(() => ['16%', '56%', '100%'], []);
  const businesses = useVisibleBusinesses();
  const setCategory = useMapStore(s => s.setCategory);
  const setQuery = useMapStore(s => s.setQuery);
  const cardW = width - 32 - 28; // deja asomar la siguiente tarjeta
  const cardH = Math.round(height * 0.44);
  const rows = useMemo(() => ROWS.map(r => ({
    key: r.key,
    items: businesses.filter(r.match)
  })).filter(r => r.items.length > 0), [businesses]);
  return <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints} topInset={topInset} animatedIndex={animatedIndex} animatedPosition={animatedPosition} backgroundStyle={styles.bg} handleIndicatorStyle={styles.handle}><BottomSheetScrollView contentContainerStyle={styles.content}>{rows.length === 0 ? <View style={styles.empty}><Text style={styles.emptyTitle}>No hay negocios con ese filtro</Text><Text style={styles.emptyText}>Prueba otra categoría o borra la búsqueda.</Text><Pressable onPress={() => {
          setCategory('all');
          setQuery('');
        }} style={styles.emptyBtn}><Text style={styles.emptyBtnText}>ver todo</Text></Pressable></View> : rows.map(row => <FlatList horizontal data={row.items} keyExtractor={b => b.id} showsHorizontalScrollIndicator={false} snapToInterval={cardW + 12} decelerationRate="fast" contentContainerStyle={styles.rowContent} ItemSeparatorComponent={() => <View style={{
        width: 12
      }} />} renderItem={({
        item
      }) => <BusinessCard business={item} width={cardW} height={cardH} />} key={row.key} />)}</BottomSheetScrollView></BottomSheet>;
}
export const FeedSheet = memo(FeedSheetView);

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.sheet,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet
  },
  handle: {
    backgroundColor: '#9AA7B5',
    width: 56,
    height: 5
  },
  content: {
    gap: 14,
    paddingTop: 4,
    paddingBottom: 80
  },
  rowContent: {
    paddingHorizontal: 16
  },
  empty: {
    padding: 24,
    alignItems: 'center',
    gap: 8
  },
  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.navy
  },
  emptyText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textMuted
  },
  emptyBtn: {
    marginTop: 8,
    height: 42,
    paddingHorizontal: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.navy,
    justifyContent: 'center'
  },
  emptyBtnText: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: 15
  }
});
