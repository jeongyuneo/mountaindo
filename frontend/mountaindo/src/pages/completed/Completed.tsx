import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import CompletedMountainModal from '../../components/completed/CompletedMountainModal';
import Map from '../../components/completed/Map';

// 임시 완등한 산 데이터 리스트
export const completedMountainLocation = [
  {id: 1, latitude: 36.2745577, longitude: 127.2485896, mountain: '계룡산'},
  {
    id: 2,
    latitude: 37.608916828031,
    longitude: 127.00307101152,
    mountain: '북한산',
  },
  {id: 3, latitude: 33.24749501, longitude: 126.553175, mountain: '한라산'},
  {
    id: 4,
    latitude: 35.480512825425,
    longitude: 127.69586767438,
    mountain: '지리산',
  },
  {id: 5, latitude: 35.480512825425, longitude: 127.7, mountain: '테스트'},
];

function Completed() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNumber, setModalNumber] = useState(0);

  return (
    <View style={styles.mapContainer}>
      <Map
        completedMountainLocation={completedMountainLocation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setModalNumber={setModalNumber}
      />
      {/* 지도의 마커가 클릭되었을 경우 해당 아이디 값으로 산 정보 띄워줌 */}
      {modalVisible && (
        <CompletedMountainModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          mountain={completedMountainLocation[modalNumber - 1].mountain}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
export default Completed;
