import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
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
        <View style={styles.contentWrapper}>
          {level === '상' ? (
            <View>
              <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
              <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
              <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
            </View>
          ) : level === '중' ? (
            <View>
              <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
              <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
            </View>
          ) : (
            <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
          )}
          <AppText style={styles.trailText}>{name}</AppText>
          <AppText style={styles.levelText}>{length}km</AppText>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  courseItemWrapper: {
    elevation: 5,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.1,
    backgroundColor: '#faf9f2',
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  trailText: {
    fontSize: 14,
    marginHorizontal: 30,
    color: 'grey',
  },
  imageSrc: {
    width: 90,
    height: 80,
  },
  iconStar: {
    color: '#f5e642',
  },
  levelText: {
    fontSize: 12,
  },
  timeDurationText: {
    fontSize: 10,
  },
});

export default CourseItem;
