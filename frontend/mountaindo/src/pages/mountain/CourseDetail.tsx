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
  const trailName = route.params?.trailName;
  const trailLength = route.params?.trailLength;
  const goingUpTime = route.params?.goingUpTime;
  const goingDownTime = route.params?.goingDownTime;
  const risk = route.params?.risk;

  // 네 개의 값 중 하나라도 없다면 return
  useEffect(() => {
    if (!trailName || !trailLength || !goingUpTime || !goingDownTime || !risk) {
      return;
    }
  }, [
    route.params?.trailName,
    route.params?.trailLength,
    route.params?.goingUpTime,
    route.params?.goingDownTime,
    route.params?.risk,
    trailName,
    trailLength,
    goingUpTime,
    goingDownTime,
    risk,
  ]);
  return (
    <View>
      <Image
        source={require('../../assets/gyeryongTrailCourse.jpg')}
        style={styles.imageSrc}
      />
      <Text style={styles.titleText}>{trailName}</Text>
      <Text style={styles.contentText}>총 길이 : {trailLength}km</Text>
      <Text style={styles.contentText}>상행 시간 : {goingUpTime} 시간</Text>
      <Text style={styles.contentText}>하행 시간 : {goingDownTime} 시간</Text>
      {risk ? <Text style={styles.contentText}>위험도: {risk}</Text> : <></>}
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
