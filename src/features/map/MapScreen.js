import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import * as Location from 'expo-location';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CHIPS_HEIGHT, FLOAT_GAP, HEADER_HEIGHT, LOCATE_SIZE } from './theme';
import { BUSINESSES } from './mock';
import { useMapStore } from './store';
import { MapHeader } from './components/MapHeader';
import { CategoryChips } from './components/CategoryChips';
import { MapCanvas } from './components/MapCanvas';
import { LocateButton } from './components/LocateButton';
import { FeedSheet } from './components/FeedSheet';
import { DetailSheet } from './components/DetailSheet';
export default function MapScreen() {
  const {
    height
  } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const topInset = insets.top + HEADER_HEIGHT + 8;
  const cameraRef = useRef(null);
  const lastSelectedRef = useRef(null);
  const feedRef = useRef(null);
  const detailRef = useRef(null);
  const selectedId = useMapStore(s => s.selectedId);
  const selected = useMemo(() => BUSINESSES.find(b => b.id === selectedId) ?? null, [selectedId]);
  // Posición/índice de cada sheet, compartidos con header y controles flotantes
  const feedIndex = useSharedValue(1);
  const feedPos = useSharedValue(height);
  const detailIndex = useSharedValue(-1);
  const detailPos = useSharedValue(height);
  // 0 → sheets abajo, 1 → algún sheet a pantalla completa
  const fullness = useDerivedValue(() => Math.max(interpolate(feedIndex.value, [1, 2], [0, 1], Extrapolation.CLAMP), interpolate(detailIndex.value, [0, 1], [0, 1], Extrapolation.CLAMP)));
  // Abrir / cerrar el detalle + centrar el marcador en la zona visible del mapa
  useEffect(() => {
    if (selected) {
      lastSelectedRef.current = selected;
      detailRef.current?.snapToIndex(0);
      cameraRef.current?.setCamera({
        centerCoordinate: selected.coordinate,
        zoomLevel: 16,
        animationDuration: 600,
        padding: {
          paddingTop: topInset,
          paddingBottom: height * 0.5,
          paddingLeft: 0,
          paddingRight: 0
        }
      });
    } else {
      detailRef.current?.close();
      if (lastSelectedRef.current) {
        cameraRef.current?.setCamera({
          centerCoordinate: lastSelectedRef.current.coordinate,
          animationDuration: 400,
          padding: {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0
          }
        });
        lastSelectedRef.current = null;
      }
    }
  }, [height, topInset, selected]);
  const onLocate = async () => {
    const {
      status
    } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    const pos = await Location.getCurrentPositionAsync({});
    cameraRef.current?.setCamera({
      centerCoordinate: [pos.coords.longitude, pos.coords.latitude],
      zoomLevel: 15.5,
      animationDuration: 700
    });
  };
  // Chips: pegados al borde superior del feed; se ocultan si sube mucho o si hay detalle
  const chipsStyle = useAnimatedStyle(() => {
    const feedOpacity = interpolate(feedPos.value, [topInset + 60, height * 0.5], [0, 1], Extrapolation.CLAMP);
    const detailOpacity = interpolate(detailPos.value, [height * 0.5, height * 0.8], [0, 1], Extrapolation.CLAMP);
    return {
      opacity: Math.min(feedOpacity, detailOpacity),
      transform: [{
        translateY: feedPos.value - CHIPS_HEIGHT - FLOAT_GAP
      }]
    };
  });
  // Botón de ubicación: sobre los chips, o sobre el detalle si está abierto
  const locateStyle = useAnimatedStyle(() => {
    const base = Math.min(feedPos.value - CHIPS_HEIGHT - FLOAT_GAP, detailPos.value);
    return {
      opacity: interpolate(base, [topInset + 80, height * 0.5], [0, 1], Extrapolation.CLAMP),
      transform: [{
        translateY: base - LOCATE_SIZE - FLOAT_GAP
      }]
    };
  });
  return <View style={styles.root}><MapCanvas cameraRef={cameraRef} /><Animated.View pointerEvents="box-none" style={[styles.chips, chipsStyle]}><CategoryChips /></Animated.View><Animated.View pointerEvents="box-none" style={[styles.locate, locateStyle]}><LocateButton onPress={onLocate} /></Animated.View><FeedSheet sheetRef={feedRef} animatedIndex={feedIndex} animatedPosition={feedPos} topInset={topInset} /><DetailSheet sheetRef={detailRef} animatedIndex={detailIndex} animatedPosition={detailPos} topInset={topInset} /><MapHeader fullness={fullness} /></View>;
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E9F1F8'
  },
  chips: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: CHIPS_HEIGHT
  },
  locate: {
    position: 'absolute',
    top: 0,
    left: 16
  }
});
