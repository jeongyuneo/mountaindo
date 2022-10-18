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
    marginVertical: 5,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  levelWrapper: {
    flex: 0.1,
  },
  nameWrapper: {
    flex: 0.4,
    backgroundColor: '#57d696',
    opacity: 0.7,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lengthWrapper: {
    flex: 0.2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#57d696',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeWrapper: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#d4d3cd',
  },
  nameText: {
    fontSize: 12,
    color: 'white',
  },
  smallText: {
    fontSize: 10,
    color: 'white',
  },
  iconStar: {
    color: '#f5e642',
  },
  lengthText: {
    fontSize: 10,
    color: '#57d696',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
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
