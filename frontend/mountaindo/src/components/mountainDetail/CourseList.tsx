import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
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
      <AppTextBold style={styles.courseText}>코스 목록</AppTextBold>
      <View style={styles.courseListWrapper}>
        <ScrollView horizontal={true}>
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
    marginBottom: 20,
  },
  courseListWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  courseText: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
  },
});

export default CourseList;
