import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

interface Props {
  id: number;
  trail: string;
  level: string;
  timeDuration: string;
  totalDistance: number;
  imageSrc: any;
  moveToCourseDetail: any;
}

function CourseItem({
  id,
  trail,
  level,
  timeDuration,
  totalDistance,
  imageSrc,
  moveToCourseDetail,
}: Props) {
  return (
    <View style={styles.courseItemWrapper}>
      <Pressable
        onPress={() => {
          moveToCourseDetail(
            id,
            trail,
            level,
            timeDuration,
            totalDistance,
            imageSrc,
          );
        }}>
        <Text style={styles.trailText}>{trail}</Text>
        <Image source={imageSrc} style={styles.imageSrc} />
        <Text style={styles.levelText}>난이도: {level}</Text>
        <Text style={styles.timeDurationText}>이동 시간: {timeDuration}</Text>
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
    color: 'black',
  },
  imageSrc: {
    width: 90,
    height: 80,
  },
  levelText: {
    fontSize: 12,
    color: 'black',
  },
  timeDurationText: {
    fontSize: 10,
    color: 'black',
  },
});

export default CourseItem;
