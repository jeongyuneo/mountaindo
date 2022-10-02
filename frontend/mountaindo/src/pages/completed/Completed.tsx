import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import CompletedMountainModal from '../../components/completed/CompletedMountainModal';
import Map from '../../components/completed/Map';
import {completedMountainList} from '../../slices/hikingSlice/hiking';
import {useAppDispatch} from '../../store';

export type CompletedMountainList = {
  mountainName: string;
  address: string;
  lastHikingDate: string;
  lastHikingTrailName: string;
  latitude: any;
  longitude: any;
};

function Completed() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNumber, setModalNumber] = useState(0);
  const [mountainList, setMountainList] = useState<
    CompletedMountainList[] | []
  >([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(completedMountainList(''))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setMountainList(res.payload);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.mapContainer}>
      <Map
        mountainList={mountainList}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setModalNumber={setModalNumber}
      />
      {/* 지도의 마커가 클릭되었을 경우 해당 아이디 값으로 산 정보 띄워줌 */}
      {mountainList?.length > 0 && modalVisible && (
        <CompletedMountainModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          mountain={mountainList[modalNumber]}
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
