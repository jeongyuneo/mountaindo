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
          <View style={styles.levelWrapper}>
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
          </View>
          <View style={styles.nameWrapper}>
            <AppText style={styles.trailText}>{name}</AppText>
          </View>
          <View style={styles.lengthWrapper}>
            <AppText style={styles.levelText}>{length}km</AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  courseItemWrapper: {
    height: 50,
    justifyContent: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  levelWrapper: {
    marginRight: 30,
    marginLeft: 20,
    padding: 5,
  },
  nameWrapper: {
    marginRight: 30,
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  trailText: {
    fontSize: 14,
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
