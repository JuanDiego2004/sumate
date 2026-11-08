import React, { memo } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { directionsUrl } from '../config';
import { colors, fonts, radius } from '../theme';
import { useMapStore } from '../store';
const BADGES = {
  trending: {
    label: 'tendencia',
    color: colors.orange
  },
  new: {
    label: 'recién abierto',
    color: colors.emerald
  },
  best_price: {
    label: 'mejor precio',
    color: '#38BDF8'
  }
};
function BusinessCardView({
  business,
  width,
  height
}) {
  const select = useMapStore(s => s.select);
  const saved = useMapStore(s => s.savedIds.includes(business.id));
  const toggleSave = useMapStore(s => s.toggleSave);
  const badge = business.badge ? BADGES[business.badge] : null;
  const n = business.offers.length;
  return <Pressable onPress={() => select(business.id)} style={[styles.card, {
    width,
    height
  }]}><Image source={{
      uri: business.cover
    }} style={StyleSheet.absoluteFill} contentFit="cover" /><LinearGradient colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.8)']} locations={[0.4, 1]} style={StyleSheet.absoluteFill} />{badge && <View style={styles.badge}><View style={[styles.dot, {
        backgroundColor: badge.color
      }]} /><Text style={styles.badgeText}>{badge.label}</Text></View>}<View style={styles.bottom}><Text style={styles.title} numberOfLines={2}>{business.name}</Text><View style={styles.tags}>{business.tags.slice(0, 3).map(t => <View style={styles.tag} key={t}><Text style={styles.tagText}>{t}</Text></View>)}</View><View style={styles.source}><Ionicons name="pricetag-outline" size={15} color="#fff" /><Text style={styles.sourceText}>publicó {n} {n === 1 ? 'oferta' : 'ofertas'} • {business.publishedAgo}</Text></View><View style={styles.actions}><View style={styles.social}><View style={styles.avatars}>{business.savedBy.slice(0, 3).map((u, i) => <Image source={{
              uri: u
            }} style={[styles.avatar, {
              marginLeft: i === 0 ? 0 : -10
            }]} key={u} />)}</View><Text style={styles.count}>{business.savedCount}</Text></View><Pressable onPress={() => toggleSave(business.id)} style={styles.btn}><Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={16} color="#fff" /><Text style={styles.btnText}>{saved ? 'guardado' : 'guardar'}</Text></Pressable><Pressable onPress={() => Linking.openURL(directionsUrl(business.coordinate[0], business.coordinate[1]))} style={styles.btn}><Ionicons name="navigate-outline" size={16} color="#fff" /><Text style={styles.btnText}>ir</Text></Pressable></View></View></Pressable>;
}
export const BusinessCard = memo(BusinessCardView);

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: '#222'
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.glass,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7
  },
  badgeText: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: 17
  },
  bottom: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    gap: 10
  },
  title: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 34
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  tag: {
    paddingHorizontal: 12,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center'
  },
  tagText: {
    color: '#fff',
    fontFamily: fonts.medium,
    fontSize: 14
  },
  source: {
    height: 38,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.glass,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sourceText: {
    color: '#fff',
    fontFamily: fonts.medium,
    fontSize: 14
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1
  },
  avatars: {
    flexDirection: 'row'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3a2f27'
  },
  count: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: 15
  },
  btn: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.glass,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  btnText: {
    color: '#fff',
    fontFamily: fonts.medium,
    fontSize: 15
  }
});
