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
  const name = route.params?.name;
  const length = route.params?.length;
  const level = route.params?.level;
  const imageUrl = route.params?.imageUrl;

  // 네 개의 값 중 하나라도 없다면 return
  useEffect(() => {
    if (!name || !length || !level) {
      return;
    }
  }, [
    route.params?.name,
    route.params?.length,
    route.params?.level,
    route.params?.imageUrl,
    name,
    length,
    level,
    imageUrl,
  ]);
  return (
    <View>
      <Image
        source={require('../../assets/gyeryongTrailCourse.jpg')}
        style={styles.imageSrc}
      />
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.contentText}>난이도 : {level}</Text>
      <Text style={styles.contentText}>총 길이 : {length}km</Text>
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
