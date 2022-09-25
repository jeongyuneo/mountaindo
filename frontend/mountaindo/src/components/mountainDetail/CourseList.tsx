import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CourseItem from './CourseItem';

interface Props {
  CourseListDummy: {
    id: number;
    mountain: string;
    location: string;
    trailList: {
      id: number;
      trail: string;
      level: string;
      timeDuration: string;
      location: string;
      visitedDate: string;
      totalDistance: number;
      totalHigh: number;
      imageSrc: any;
    }[];
  }[];
  moveToCourseDetail: any;
}

function CourseList({CourseListDummy, moveToCourseDetail}: Props) {
  return (
    <View style={styles.courseList}>
      <Text style={styles.courseText}>코스 목록</Text>
      <View style={styles.courseListWrapper}>
        <ScrollView horizontal={true}>
          {CourseListDummy[0].trailList.map(item => (
            <CourseItem
              id={item.id}
              trail={item.trail}
              level={item.level}
              timeDuration={item.timeDuration}
              totalDistance={item.totalDistance}
              imageSrc={item.imageSrc}
              moveToCourseDetail={moveToCourseDetail}
            />
          ))}
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
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginTop: 20,
  },
});

export default CourseList;
