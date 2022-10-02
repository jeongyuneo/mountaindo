import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import AppText from '../AppText';

interface Props {
  trailId: number;
  name: string;
  length: number;
  level: string;
  imageUrl: any;
  moveToCourseDetail: any;
}

function CourseItem({
  trailId,
  name,
  length,
  level,
  imageUrl,
  moveToCourseDetail,
}: Props) {
  return (
    <View style={styles.courseItemWrapper}>
      <Pressable
        onPress={() => {
          moveToCourseDetail(trailId, name, length, level, imageUrl);
        }}>
        <AppText style={styles.trailText}>{name}</AppText>
        <Image
          source={require('../../assets/gyeryongTrailCourse.jpg')}
          style={styles.imageSrc}
        />
        <AppText style={styles.levelText}>난이도: {level}</AppText>
        <AppText style={styles.timeDurationText}>길이: {length}</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  courseItemWrapper: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  trailText: {
    fontSize: 12,
  },
  imageSrc: {
    width: 90,
    height: 80,
  },
  levelText: {
    fontSize: 12,
  },
  timeDurationText: {
    fontSize: 10,
  },
});

export default CourseItem;
