import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import CourseList from '../../components/mountainDetail/CourseList';
import CourseListDummy from '../../components/mountainDetail/CourseListDummy';
import Facilites from '../../components/mountainDetail/Facilities';
import RankingList from '../../components/mountainDetail/RankingList';
import WeatherForecast from '../../components/mountainDetail/WeatherForecast';

type MountainDetailScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'MountainDetail'
>;

function MountainDetail({navigation}: MountainDetailScreenProps) {
  const moveToCourseDetail = (
    id: number,
    trail: string,
    level: string,
    timeDuration: string,
    totalDistance: number,
    imageSrc: any,
  ) => {
    navigation.navigate('CourseDetail', {
      id,
      trail,
      level,
      timeDuration,
      totalDistance,
      imageSrc,
    });
  };
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
      <CourseList
        CourseListDummy={CourseListDummy}
        moveToCourseDetail={moveToCourseDetail}
      />
      <RankingList />
      <Facilites />
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
