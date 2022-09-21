import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import NaverMapView, {LayerGroup, Marker, Path} from 'react-native-nmap';

type MyPosition = {
  latitude: number;
  longitude: number;
};

type Props = {
  myPosition: MyPosition;
};
function Map({myPosition}: Props) {
  const mapView = useRef<any>(null); // NaverMapView의 설정을 바꾸기 위해 ref 설정 변수

  // 시작지점과 도착지점 임의의 경도, 위도 값으로 설정
  const start = {latitude: 36.354946759143, longitude: 127.29980994578};
  const end = {latitude: 36.358303220416, longitude: 127.30157350178};

  return (
    <NaverMapView
      ref={mapView}
      style={styles.mapView}
      zoomControl={false}
      // 지도의 label 설정 -> 등산로 정보 보이도록 설정
      onInitialized={() => {
        mapView.current.setLayerGroupEnabled(
          LayerGroup.LAYER_GROUP_MOUNTAIN,
          true,
        );
      }}
      center={{
        zoom: 15,
        tilt: 0,
        latitude: myPosition.latitude,
        longitude: myPosition.longitude,
      }}>
      {myPosition?.latitude && (
        <Marker
          coordinate={{
            latitude: myPosition.latitude,
            longitude: myPosition.longitude,
          }}
          width={15}
          height={15}
          anchor={{x: 0.5, y: 0.5}}
          caption={{text: '나'}}
          image={require('../../assets/red-dot.png')}
        />
      )}
      <Marker
        coordinate={{
          latitude: start.latitude,
          longitude: start.longitude,
        }}
        width={15}
        height={15}
        anchor={{x: 0.5, y: 0.5}}
        caption={{text: '출발'}}
        image={require('../../assets/blue-dot.png')}
      />
      <Path
        coordinates={[
          {
            latitude: start.latitude,
            longitude: start.longitude,
          },
          {latitude: end.latitude, longitude: end.longitude},
        ]}
        color="orange"
      />
      <Marker
        coordinate={{latitude: end.latitude, longitude: end.longitude}}
        width={15}
        height={15}
        anchor={{x: 0.5, y: 0.5}}
        caption={{text: '도착'}}
        image={require('../../assets/green-dot.png')}
      />
    </NaverMapView>
  );
}

const styles = StyleSheet.create({
  mapView: {
    width: '100%',
    height: '100%',
  },
  mapLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Map;
