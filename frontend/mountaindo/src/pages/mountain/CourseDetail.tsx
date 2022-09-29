import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

type CourseDetailScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'CourseDetail'
>;

function CourseItem({route}: CourseDetailScreenProps) {
  // 페이지 이동 시 함께 전달된 param에 해당 정보가 있는 경우 변수에 할당
  const trail = route.params?.trail;
  const timeDuration = route.params?.timeDuration;
  const totalDistance = route.params?.totalDistance;
  const imageSrc = route.params?.imageSrc;

  // 네 개의 값 중 하나라도 없다면 return
  useEffect(() => {
    if (!trail || !timeDuration || !totalDistance || !imageSrc) {
      return;
    }
  }, [
    route.params?.trail,
    route.params?.timeDuration,
    route.params?.totalDistance,
    route.params?.imageSrc,
    trail,
    timeDuration,
    totalDistance,
    imageSrc,
  ]);
  return (
    <View>
      <Image source={imageSrc} style={styles.imageSrc} />
      <Text style={styles.titleText}>{trail}</Text>
      <Text style={styles.contentText}>상행 소요 시간 : {timeDuration}</Text>
      <Text style={styles.contentText}>하행 소요 시간 : {timeDuration}</Text>
      <Text style={styles.contentText}>총 길이 : {totalDistance}km</Text>
      <Text style={styles.contentText}>위험 구간 안내</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageSrc: {
    width: '100%',
    height: 300,
  },
  titleText: {
    fontSize: 25,
    marginVertical: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 15,
    marginVertical: 3,
    color: 'black',
  },
});

export default CourseItem;
