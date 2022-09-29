import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import AppText from '../AppText';

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
        <AppText style={styles.trailText}>{trail}</AppText>
        <Image source={imageSrc} style={styles.imageSrc} />
        <AppText style={styles.levelText}>난이도: {level}</AppText>
        <AppText style={styles.timeDurationText}>
          이동 시간: {timeDuration}
        </AppText>
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
