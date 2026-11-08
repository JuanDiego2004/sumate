import React, { memo, useMemo } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CATEGORY_BY_ID } from '../categories';
import { directionsUrl, formatPrice } from '../config';
import { BUSINESSES } from '../mock';
import { colors, fonts, radius } from '../theme';
import { useMapStore } from '../store';
function DetailSheetView({
  sheetRef,
  animatedIndex,
  animatedPosition,
  topInset
}) {
  const snapPoints = useMemo(() => ['50%', '100%'], []);
  const selectedId = useMapStore(s => s.selectedId);
  const lastSelectedId = useMapStore(s => s.lastSelectedId);
  const select = useMapStore(s => s.select);
  const businessId = selectedId ?? lastSelectedId;
  const business = BUSINESSES.find(b => b.id === businessId) ?? null;
  return <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints} topInset={topInset} enablePanDownToClose onClose={() => select(null)} animatedIndex={animatedIndex} animatedPosition={animatedPosition} backgroundStyle={styles.bg} handleIndicatorStyle={styles.handle}><BottomSheetScrollView contentContainerStyle={styles.content}>{business && <Detail business={business} />}</BottomSheetScrollView></BottomSheet>;
}
export const DetailSheet = memo(DetailSheetView);

function Detail({
  business
}) {
  const cat = CATEGORY_BY_ID[business.category];
  const saved = useMapStore(s => s.savedIds.includes(business.id));
  const toggleSave = useMapStore(s => s.toggleSave);
  return <View style={{
    gap: 14
  }}><Image source={{
      uri: business.cover
    }} style={styles.cover} contentFit="cover" /><View style={styles.titleRow}><Text style={styles.title} numberOfLines={2}>{business.name}</Text><View style={[styles.status, !business.openNow && styles.statusClosed]}><Text style={styles.statusText}>{business.openNow ? 'abierto' : 'cerrado'}</Text></View></View><Text style={styles.meta}>{cat.emoji} {cat.label} • a {business.distanceM} m • {business.address}</Text><View style={styles.tags}>{business.tags.map(t => <View style={styles.tag} key={t}><Text style={styles.tagText}>{t}</Text></View>)}</View><View style={styles.actions}><Pressable style={[styles.action, styles.actionPrimary]} onPress={() => Linking.openURL(directionsUrl(business.coordinate[0], business.coordinate[1]))}><Ionicons name="navigate" size={18} color="#fff" /><Text style={styles.actionTextLight}>cómo llegar</Text></Pressable><Pressable style={styles.action} onPress={() => toggleSave(business.id)}><Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={colors.navy} /><Text style={styles.actionText}>{saved ? 'guardado' : 'guardar'}</Text></Pressable></View><Text style={styles.section}>ofertas de hoy</Text>{business.offers.map(o => <OfferRow offer={o} key={o.id} />)}<Text style={styles.section}>sobre el negocio</Text><Text style={styles.body}>{business.description}</Text></View>;
}
function OfferRow({
  offer
}) {
  const best = !!offer.isBestNearby;
  const saving = offer.oldPrice != null ? Math.round((offer.oldPrice - offer.price) / offer.oldPrice * 100) : null;
  return <View style={[styles.offer, best && styles.offerBest]}><View style={{
      flex: 1
    }}><Text style={styles.offerName}>{offer.product}</Text>{offer.unit ? <Text style={styles.offerUnit}>{offer.unit}</Text> : null}{best && <View style={styles.bestTag}><Ionicons name="checkmark-circle" size={15} color={colors.emeraldDark} /><Text style={styles.bestText}>mejor precio cerca</Text></View>}</View><View style={{
      alignItems: 'flex-end'
    }}><Text style={styles.price}>{formatPrice(offer.price)}</Text>{offer.oldPrice != null && <Text style={styles.oldPrice}>{formatPrice(offer.oldPrice)}</Text>}{saving != null && saving > 0 && <View style={styles.saving}><Text style={styles.savingText}>−{saving} %</Text></View>}</View></View>;
}
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
    padding: 16,
    paddingBottom: 80
  },
  cover: {
    height: 200,
    borderRadius: radius.card
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  title: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 32,
    color: colors.navy
  },
  status: {
    paddingHorizontal: 12,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.emerald,
    justifyContent: 'center'
  },
  statusClosed: {
    backgroundColor: colors.textMuted
  },
  statusText: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: 13
  },
  meta: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textMuted
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  tag: {
    paddingHorizontal: 12,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  tagText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.navy
  },
  actions: {
    flexDirection: 'row',
    gap: 10
  },
  action: {
    flex: 1,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  actionPrimary: {
    backgroundColor: colors.navy
  },
  actionText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.navy
  },
  actionTextLight: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: '#fff'
  },
  section: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.navy,
    marginTop: 6
  },
  body: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 23,
    color: colors.navy
  },
  offer: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  offerBest: {
    borderColor: colors.emerald
  },
  offerName: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.navy
  },
  offerUnit: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2
  },
  bestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8
  },
  bestText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.emeraldDark
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.navy
  },
  oldPrice: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textMuted,
    textDecorationLine: 'line-through'
  },
  saving: {
    marginTop: 6,
    paddingHorizontal: 8,
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.orange,
    justifyContent: 'center'
  },
  savingText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.navy
  }
});
