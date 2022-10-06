import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';
import CourseItem from './CourseItem';

interface Props {
  trailList: {
    trailId: number;
    name: string;
    length: number;
    level: string;
    imageUrl: any;
  }[];
  moveToCourseDetail: any;
}

function CourseList({trailList, moveToCourseDetail}: Props) {
  return (
    <View style={styles.courseList}>
      <View style={styles.titleLevelWrapper}>
        <AppTextBold style={styles.courseText}>코스 목록</AppTextBold>
        <View style={styles.levelsWrapper}>
          <AppText style={styles.levelText}>난이도: </AppText>
          <View style={styles.levelWrapper}>
            <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
            <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
            <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
            <AppText style={styles.levelText}>상</AppText>
          </View>
          <View style={styles.levelWrapper}>
            <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
            <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
            <AppText style={styles.levelText}>중</AppText>
          </View>
          <View style={styles.levelWrapper}>
            <FontAwesomeIcon icon={faStar} style={styles.iconStar} />
            <AppText style={styles.levelText}>하</AppText>
          </View>
        </View>
      </View>
      <View style={styles.subTitleWrapper}>
        <AppText style={styles.level2Text}>난이도</AppText>
        <AppText style={styles.nameText}>등산로</AppText>
        <AppText style={styles.lengthText}>길이</AppText>
        <AppText style={styles.goingUpText}>상행 시간</AppText>
        <AppText style={styles.goingDownText}>하행 시간</AppText>
      </View>
      <View style={styles.courseListWrapper}>
        <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
          {trailList?.length > 0 ? (
            trailList.map(item => (
              <CourseItem
                trailId={item.trailId}
                name={item.name}
                length={item.length}
                level={item.level}
                imageUrl={item.imageUrl}
                moveToCourseDetail={moveToCourseDetail}
              />
            ))
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  courseList: {
    marginVertical: 30,
  },
  scrollView: {
    height: 150,
  },
  titleLevelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  levelsWrapper: {
    flexDirection: 'row',
    marginRight: 10,
  },
  levelWrapper: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  iconStar: {
    color: '#f5e642',
  },
  courseListWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  courseText: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  levelText: {
    fontSize: 11,
    marginTop: 3,
  },
  subTitleWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  level2Text: {
    marginHorizontal: 10,
    fontSize: 12,
  },
  nameText: {
    marginHorizontal: 60,
    fontSize: 12,
  },
  lengthText: {
    marginLeft: 40,
    marginRight: 15,
    fontSize: 12,
  },
  goingUpText: {
    marginHorizontal: 10,
    fontSize: 12,
  },
  goingDownText: {
    marginHorizontal: 3,
    fontSize: 12,
  },
});

export default CourseList;
