import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {getTrailDetail} from '../../slices/mountainSlice/mountain';
import {useAppDispatch} from '../../store';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

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
  const [goingUpTime, setGoingUpTime] = useState(0);
  const [goingDownTime, setGoingDownTime] = useState(0);
  const [risk, setRisk] = useState('');

  const dispatchTrailDetail = (trailIdArg: number) => {
    dispatch(getTrailDetail({trailId: trailIdArg}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setGoingUpTime(res.payload?.goingUpTime);
          setGoingDownTime(res.payload?.goignDownTime);
          setRisk(res.payload?.risk);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatchTrailDetail(trailId);
  }, []);

  return (
    <View style={styles.courseItemWrapper}>
      <Pressable>
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
            <AppTextBold
              style={name.length > 14 ? styles.smallText : styles.nameText}>
              {name}
            </AppTextBold>
          </View>
          <View style={styles.lengthWrapper}>
            <AppText style={styles.lengthText}>{length}km</AppText>
          </View>
          <View style={styles.timeWrapper}>
            <AppText style={styles.timeText}>{goingUpTime}분</AppText>
          </View>
          <View style={styles.timeWrapper}>
            {goingDownTime ? (
              <AppText style={styles.timeText}>{goingDownTime}분</AppText>
            ) : (
              <AppText style={styles.timeText}>-</AppText>
            )}
          </View>
        </View>
        <View style={styles.riskWrapper}>
          <AppText style={styles.riskText}>{risk}</AppText>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  courseItemWrapper: {
    height: 50,
    justifyContent: 'center',
    marginVertical: 5,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  levelWrapper: {
    padding: 5,
  },
  nameWrapper: {
    backgroundColor: '#57d696',
    opacity: 0.7,
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lengthWrapper: {
    borderRadius: 20,
    paddingHorizontal: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#57d696',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  timeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    padding: 5,
    backgroundColor: '#d4d3cd',
    width: 50,
  },
  nameText: {
    fontSize: 12,
    color: 'white',
    width: 160,
  },
  smallText: {
    fontSize: 10,
    color: 'white',
    width: 160,
  },
  imageSrc: {
    width: 90,
    height: 80,
  },
  iconStar: {
    color: '#f5e642',
  },
  lengthText: {
    fontSize: 10,
    color: '#57d696',
  },
  timeText: {
    fontSize: 10,
    color: 'white',
  },
  riskWrapper: {
    marginLeft: 60,
    marginTop: 5,
  },
  riskText: {
    fontSize: 10,
    color: 'red',
  },
});

export default CourseItem;
