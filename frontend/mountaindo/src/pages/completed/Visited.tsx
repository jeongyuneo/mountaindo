import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import VisitedList from '../../components/completed/VisitedList';
import {visitedTrailList} from '../../slices/hikingSlice/hiking';
import {useAppDispatch} from '../../store';

// navigation 사용을 위해 props 설정
type VisitedScreenProps = NativeStackScreenProps<LoggedInParamList, 'Visited'>;

export type VisitedListType = {
  address: string;
  lastHikingDate: string;
  lastHikingTrailDate: string;
  mountainName: string;
};

function Visited({navigation}: VisitedScreenProps) {
  const [visitedTrail, setVisitedTrail] = useState<VisitedListType[] | []>([]);

  // 방문한 산 상세 페이지 이동 함수
  const moveToVisitedDetail = (
    trails: any,
    mountain: string,
    location: string,
  ) => {
    navigation.navigate('VisitedDetail', {
      trails,
      mountain,
      location,
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
    <View style={styles.container}>
      <VisitedList
        visitedTrail={visitedTrail}
        moveToVisitedDetail={moveToVisitedDetail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
});

export default Visited;
