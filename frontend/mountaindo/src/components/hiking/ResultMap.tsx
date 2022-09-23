import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import NaverMapView, {LayerGroup, Marker, Path} from 'react-native-nmap';

type MyPosition = {
  latitude: number;
  longitude: number;
};

type Props = {
  coords: MyPosition[];
};
function Map({coords}: Props) {
  const mapView = useRef<any>(null); // NaverMapView의 설정을 바꾸기 위해 ref 설정 변수
  const [zoomLevel, setZoomLevel] = useState(13); // 지도의 zoomLevel을 설정할 변수 -> 기본값 13

  // 화면 렌더링 시 zoomLevel을 결정
  useEffect(() => {
    if (coords.length < 2) {
      return;
    }
    const findMaxArray = [];

    // 1. 중심 좌표값 기준 양 극단의 경도, 위도 좌표값의 차이를 리스트에 저장
    findMaxArray.push(
      Math.abs(
        coords[0].latitude - coords[Math.floor(coords.length / 2)].latitude,
      ),
    );
    findMaxArray.push(
      Math.abs(
        coords[0].longitude - coords[Math.floor(coords.length / 2)].longitude,
      ),
    );
    findMaxArray.push(
      Math.abs(
        coords[Math.floor(coords.length / 2)].latitude -
          coords[coords.length - 1].latitude,
      ),
    );
    findMaxArray.push(
      Math.abs(
        coords[Math.floor(coords.length / 2)].longitude -
          coords[coords.length - 1].longitude,
      ),
    );

    // 2. 리스트의 값 중 가장 큰 값 가져오기
    const maxValue = Math.max(...findMaxArray);

    // 3. maxValue를 기준으로 zoomLevel 결정
    if (0.015 <= maxValue && maxValue < 0.017) {
      setZoomLevel(12.5);
    }
  }, [coords]);
  return coords.length > 0 ? (
    <NaverMapView
      ref={mapView}
      style={styles.mapView}
      zoomControl={false}
      useTextureView={true} // 다른 페이지로 이동 후 재접속해도 마커가 사라지지지 않도록 설정
      onInitialized={() => {
        mapView.current.setLayerGroupEnabled(
          LayerGroup.LAYER_GROUP_MOUNTAIN,
          true,
        );
      }}
      // 중심좌표는 좌표 리스트의 가운데 값으로 설정
      center={{
        zoom: zoomLevel,
        tilt: 0,
        latitude:
          coords.length > 2
            ? coords[Math.floor(coords.length / 2)].latitude
            : coords[0].latitude,
        longitude:
          coords.length > 2
            ? coords[Math.floor(coords.length / 2)].longitude
            : coords[0].longitude,
      }}>
      {coords.length > 0 && coords[0]?.latitude && (
        <Marker
          coordinate={{
            latitude: coords[0].latitude,
            longitude: coords[0].longitude,
          }}
          width={15}
          height={15}
          anchor={{x: 0.5, y: 0.5}}
          caption={{text: '나'}}
          image={require('../../assets/red-dot.png')}
        />
      )}
      {coords.length > 0 && coords[0]?.latitude && (
        <Path
          coordinates={[
            {
              latitude: coords[0].latitude,
              longitude: coords[0].longitude,
            },
            {latitude: coords[0].latitude, longitude: coords[0].longitude},
          ]}
          color="skyblue"
        />
      )}
      {coords.length > 0 &&
        coords.map((item, itemIndex) => (
          <>
            {itemIndex > 0 && (
              <Path
                coordinates={[
                  {
                    latitude: coords[itemIndex - 1].latitude,
                    longitude: coords[itemIndex - 1].longitude,
                  },
                  {latitude: item.latitude, longitude: item.longitude},
                ]}
                color="skyblue"
                key={itemIndex}
              />
            )}
          </>
        ))}
      {coords.length > 0 && (
        <Marker
          coordinate={{
            latitude: coords[coords.length - 1].latitude,
            longitude: coords[coords.length - 1].longitude,
          }}
          width={15}
          height={15}
          anchor={{x: 0.5, y: 0.5}}
          caption={{text: '도착'}}
          image={require('../../assets/blue-dot.png')}
        />
      )}
    </NaverMapView>
  ) : (
    <></>
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
