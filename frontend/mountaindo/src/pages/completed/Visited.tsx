import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import VisitedList from '../../components/completed/VisitedList';
import {visitedMountainList} from './Dummy';

// navigation 사용을 위해 props 설정
type VisitedScreenProps = NativeStackScreenProps<LoggedInParamList, 'Visited'>;

function Visited({navigation}: VisitedScreenProps) {
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
  return (
    <View>
      <VisitedList
        visitedMountainList={visitedMountainList}
        moveToVisitedDetail={moveToVisitedDetail}
      />
    </View>
  );
}

export default Visited;
