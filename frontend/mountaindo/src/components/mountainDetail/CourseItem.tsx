import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface Props {
  key: number;
  trail: string;
  level: string;
  timeDuration: string;
  imageSrc: any;
}

function CourseItem({trail, level, timeDuration, imageSrc}: Props) {
  return (
    <View style={styles.courseItemWrapper}>
      <Text style={styles.trailText}>{trail}</Text>
      <Image source={imageSrc} style={styles.imageSrc} />
      <Text style={styles.levelText}>난이도: {level}</Text>
      <Text style={styles.timeDurationText}>이동 시간: {timeDuration}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  courseItemWrapper: {
    width: '33%',
    marginTop: 10,
    alignItems: 'center',
  },
  trailText: {
    fontSize: 12,
    color: 'black',
  },
  imageSrc: {
    width: '80%',
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
