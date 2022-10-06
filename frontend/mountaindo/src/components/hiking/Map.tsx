import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import NaverMapView, {LayerGroup, Marker} from 'react-native-nmap';

type MyPosition = {
  latitude: number;
  longitude: number;
};

type Props = {
  myPosition: MyPosition;
};
function Map({myPosition}: Props) {
  const mapView = useRef<any>(null); // NaverMapView의 설정을 바꾸기 위해 ref 설정 변수

  return (
    <NaverMapView
      ref={mapView}
      style={styles.mapView}
      zoomControl={false}
      useTextureView={true} // 다른 페이지로 이동 후 재접속해도 마커가 사라지지지 않도록 설정
      onInitialized={() => {
        // 지도의 label 설정 -> 등산로 정보 보이도록 설정
        mapView.current.setLayerGroupEnabled(
          LayerGroup.LAYER_GROUP_MOUNTAIN,
          true,
        );
      }}
      center={{
        zoom: 13,
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
          image={require('../../assets/marker.png')}
        />
      )}
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
