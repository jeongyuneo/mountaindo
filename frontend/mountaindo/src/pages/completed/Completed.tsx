import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import CompletedMountainModal from '../../components/completed/CompletedMountainModal';
import {LoadingAnimationA} from '../../components/completed/LoadingAnimation';
import Map from '../../components/completed/Map';
import {completedMountainList} from '../../slices/hikingSlice/hiking';
import {useAppDispatch} from '../../store';
import {RootState} from '../../store/reducer';

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
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [mountainList, setMountainList] = useState<
    CompletedMountainList[] | []
  >([]);

  const dispatch = useAppDispatch();
  const isPending = useSelector((state: RootState) => state.hiking.isPending);

  // 타이머 시작 함수
  const handleStart = () => {
    setTimeout(() => {
      setIsTimeOut(false);
    }, 4000);
  };

  useEffect(() => {
    handleStart();
  }, [isPending]);

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
    <View style={styles.container}>
      {isPending || isTimeOut ? (
        <View style={styles.loading}>
          <LoadingAnimationA />
        </View>
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
  mapContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  loading: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: 150,
    borderRadius: 100,
    overflow: 'hidden',
    left: Dimensions.get('window').width / 2 - 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Completed;
