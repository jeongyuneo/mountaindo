import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import CompletedMountainModal from '../../components/completed/CompletedMountainModal';
import VisitedList from '../../components/completed/VisitedList';
import {
  visitedTrailDetail,
  visitedTrailList,
} from '../../slices/hikingSlice/hiking';
import {useAppDispatch} from '../../store';

// navigation 사용을 위해 props 설정
type VisitedScreenProps = NativeStackScreenProps<LoggedInParamList, 'Visited'>;

export type VisitedListType = {
  hikingId: number;
  trailName: string;
  lastHikingDate: string;
  useTime: string;
  level: string;
  mountainName: string;
};

type TrailDetailType = {
  accumulatedHeight: number;
  address: string;
  distance: number;
  imageUrl: any;
  mountainName: string;
  trailName: string;
  useTime: string;
};

function Visited({navigation}: VisitedScreenProps) {
  const [visitedTrail, setVisitedTrail] = useState<VisitedListType[] | []>([]);
  const [trailDetail, setTrailDetail] = useState<TrailDetailType | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // 모달을 화면에 띄울지 결정한는 변수

  // 방문한 산 상세 페이지 이동 함수
  const moveToVisitedDetail = (hikingId: number) => {
    dispatch(visitedTrailDetail({hikingId}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setTrailDetail(res.payload);
          setModalVisible(!modalVisible);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(visitedTrailList(''))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setVisitedTrail(res.payload);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <VisitedList
            visitedTrail={visitedTrail}
            moveToVisitedDetail={moveToVisitedDetail}
          />
        </View>
        {modalVisible && trailDetail && (
          <CompletedMountainModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            trails={trailDetail}
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
});

export default Visited;
