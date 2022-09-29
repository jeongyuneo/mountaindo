import {faFlag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import NaverMapView, {LayerGroup, Marker} from 'react-native-nmap';

// 경도, 위도 값이 저장된 리스트, 모달 관련 타입 설정
type Props = {
  completedMountainLocation: {
    id: number;
    latitude: number;
    longitude: number;
    mountain: string;
  }[];
  modalVisible: boolean;
  setModalVisible: any;
  setModalNumber: any;
};

function Map({
  completedMountainLocation,
  modalVisible,
  setModalVisible,
  setModalNumber,
}: Props) {
  const mapView = useRef<any>(null); // NaverMapView의 설정을 바꾸기 위해 ref 설정 변수
  // 지도의 중심 좌표 설정
  const myPosition = {
    latitude: 36,
    longitude: 127,
  };

  return (
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
      center={{
        zoom: 5.5,
        tilt: 0,
        latitude: myPosition.latitude,
        longitude: myPosition.longitude,
      }}>
      {/* completedMountainLocation의 길이가 0 이상일 때만 반복문을 돌면서 마커 생성 */}
      {completedMountainLocation.length > 0 &&
        completedMountainLocation.map(pos => (
          <Marker
            onClick={() => {
              setModalVisible(!modalVisible);
              setModalNumber(pos.id);
            }}
            coordinate={{
              latitude: pos.latitude,
              longitude: pos.longitude,
            }}
            key={pos.id}
            width={15}
            height={15}
            anchor={{x: 0.5, y: 0.5}}
            caption={{text: pos.mountain}}>
            <FontAwesomeIcon icon={faFlag} size={25} color={'#7FB77E'} />
          </Marker>
        ))}
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
