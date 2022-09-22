import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

import CourseList from '../../components/mountainDetail/CourseList';
import CourseListDummy from '../../components/mountainDetail/CourseListDummy';
import WeatherForecast from '../../components/mountainDetail/WeatherForecast';

function MountainDetail() {
  return (
    <ScrollView>
      <Image
        style={styles.mountainImg}
        source={require('../../assets/gyeryongMountain.jpg')}
      />
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>계룡산</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.locationText}>위치: 대전 광역시 유성구</Text>
        <Text style={styles.altitudeText}>고도: 800m</Text>
      </View>
      <WeatherForecast />
      <CourseList CourseListDummy={CourseListDummy} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mountainImg: {
    width: '100%',
    height: 200,
  },
  titleWrapper: {
    marginLeft: 20,
  },
  titleText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoWrapper: {
    marginLeft: 20,
    marginTop: 20,
  },
  locationText: {
    fontWeight: 'bold',
  },
  altitudeText: {
    fontWeight: 'bold',
  },
  weatherWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  weatherText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  weatherImgWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MountainDetail;
