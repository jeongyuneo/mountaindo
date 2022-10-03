import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import CourseList from '../../components/mountainDetail/CourseList';
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

function MountainDetail({navigation, route}: MountainDetailScreenProps) {
  const moveToCourseDetail = (
    trailName: string,
    trailLength: any,
    goingUpTime: any,
    goingDownTime: any,
    risk: any,
  ) => {
    navigation.navigate('CourseDetail', {
      trailName,
      trailLength,
      goingUpTime,
      goingDownTime,
      risk,
    });
  };
  const [rankingList, setRankingList] = useState<Rankings[] | null[]>([]); // 전체 랭킹 리스트를 저장할 변수
  const [myRanking, setMyRanking] = useState<Rankings | null>(null); // 내 랭킹 정보를 저장할 변수
  const sentData: any = route?.params;

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
        <AppTextBold style={styles.titleText}>
          {sentData.mountainDetail.name}
        </AppTextBold>
      </View>
      <View style={styles.infoWrapper}>
        <AppText style={styles.text}>
          위치: {sentData.mountainDetail.address}
        </AppText>
        <AppText style={styles.text}>
          고도: {sentData.mountainDetail.height}m
        </AppText>
      </View>
      <WeatherForecast />
      <CourseList
        trailList={sentData.mountainDetail.trails}
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
