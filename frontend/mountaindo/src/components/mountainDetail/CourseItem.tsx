import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {getTrailDetail} from '../../slices/mountainSlice/mountain';
import {useAppDispatch} from '../../store';
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
  const dispatch = useAppDispatch();

  const dispatchTrailDetail = (trailIdArg: number) => {
    dispatch(getTrailDetail({trailId: trailIdArg}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          moveToCourseDetail(
            res.payload?.name,
            res.payload?.length,
            res.payload?.goingUpTime,
            res.payload?.goingDownTime,
            res.payload?.risk,
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.courseItemWrapper}>
      <Pressable
        onPress={() => {
          dispatchTrailDetail(trailId);
        }}>
        <AppText style={styles.trailText}>{name}</AppText>
        <Image
          source={require('../../assets/gyeryongTrailCourse.jpg')}
          style={styles.imageSrc}
        />
        <AppText style={styles.levelText}>난이도: {level}</AppText>
        <AppText style={styles.levelText}>길이: {length}</AppText>
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
