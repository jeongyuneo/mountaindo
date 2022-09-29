import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import CourseList from '../../components/mountainDetail/CourseList';
import CourseListDummy from '../../components/mountainDetail/CourseListDummy';
import Facilites from '../../components/mountainDetail/Facilities';
import RankingList from '../../components/mountainDetail/RankingList';
import WeatherForecast from '../../components/mountainDetail/WeatherForecast';
import {mountainRanking} from '../../slices/rankingSlice/ranking';
import {useAppDispatch} from '../../store';
import {Rankings} from '../Main';

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
  const [rankingList, setRankingList] = useState<Rankings[] | null[]>([]); // 전체 랭킹 리스트를 저장할 변수
  const [myRanking, setMyRanking] = useState<Rankings | null>(null); // 내 랭킹 정보를 저장할 변수

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(mountainRanking({mountainId: 1}))
      .then(res => {
        setMyRanking({
          imageUrl: res.payload?.imageUrl,
          ranking: res.payload?.ranking,
          nickname: res.payload?.nickname,
          accumulatedHeight: res.payload?.accumulatedHeight,
        });
        setRankingList(res.payload?.rankings);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.mountainImg}
        source={require('../../assets/gyeryongMountain.jpg')}
      />
      <View style={styles.titleWrapper}>
        <AppTextBold style={styles.titleText}>계룡산</AppTextBold>
      </View>
      <View style={styles.infoWrapper}>
        <AppText style={styles.text}>위치: 대전 광역시 유성구</AppText>
        <AppText style={styles.text}>고도: 800m</AppText>
      </View>
      <WeatherForecast />
      <CourseList
        CourseListDummy={CourseListDummy}
        moveToCourseDetail={moveToCourseDetail}
      />
      <RankingList rankingList={rankingList} myRanking={myRanking} />
      <Facilites />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mountainImg: {
    width: '100%',
    height: 200,
  },
  titleWrapper: {
    marginLeft: 20,
    marginTop: 20,
  },
  titleText: {
    fontSize: 30,
  },
  infoWrapper: {
    marginLeft: 20,
    marginTop: 20,
  },
  text: {marginBottom: 5},
});

export default MountainDetail;
