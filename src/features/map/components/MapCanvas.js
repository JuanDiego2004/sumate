import React, { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Mapbox, { Camera, LocationPuck, MapView, MarkerView } from '@rnmapbox/maps';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../config';
import { useMapStore, useVisibleBusinesses } from '../store';
import { BusinessMarker } from './BusinessMarker';

const token = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;
if (token) Mapbox.setAccessToken(token);

const defaultCamera = { centerCoordinate: INITIAL_CENTER, zoomLevel: INITIAL_ZOOM };
const anchor = { x: 0.5, y: 1 };

const BusinessPin = memo(function BusinessPin({ business, selected }) {
  const select = useMapStore(s => s.select);
  return (
    <MarkerView coordinate={business.coordinate} anchor={anchor} allowOverlap>
      <Pressable onPress={() => select(business.id)}>
        <BusinessMarker business={business} selected={selected} />
      </Pressable>
    </MarkerView>
  );
});

// Mantiene el mapa nativo aislado de renders del header y los paneles.
export const MapCanvas = memo(function MapCanvas({ cameraRef }) {
  const businesses = useVisibleBusinesses();
  const selectedId = useMapStore(s => s.selectedId);
  return <NativeMap cameraRef={cameraRef} businesses={businesses} selectedId={selectedId} />;
});

const NativeMap = memo(function NativeMap({ cameraRef, businesses, selectedId }) {
  const select = useMapStore(s => s.select);
  return (
    <MapView
      style={StyleSheet.absoluteFill}
      styleURL="mapbox://styles/mapbox/standard"
      compassEnabled={false}
      onPress={() => select(null)}
    >
      <Camera ref={cameraRef} defaultSettings={defaultCamera} />
      <LocationPuck puckBearingEnabled />
      {businesses.map(business => (
        <BusinessPin key={business.id} business={business} selected={business.id === selectedId} />
      ))}
    </MapView>
  );
});
