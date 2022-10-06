import {faLocationDot, faMountain} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import CourseList from '../../components/mountainDetail/CourseList';
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
      <ImageBackground
        source={{
          uri: 'https://j7b201.p.ssafy.io' + sentData.mountainDetail.imageUrl,
        }}
        style={styles.backgroundImg}>
        <WeatherForecast
          location={sentData.mountainDetail.address.split(' ')[0]}
        />
      </ImageBackground>
      <View style={styles.titleWrapper}>
        <AppTextBold style={styles.titleText}>
          {sentData.mountainDetail.name}
        </AppTextBold>
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.iconInfoWrapper}>
          <FontAwesomeIcon icon={faMountain} style={styles.icon} />
          <AppText>높이</AppText>
          <AppText style={styles.text}>
            {sentData.mountainDetail.height}m
          </AppText>
        </View>
        <View style={styles.iconInfoWrapper}>
          <FontAwesomeIcon icon={faLocationDot} style={styles.icon} />
          <AppText>위치</AppText>
          <AppText style={styles.text}>
            {sentData.mountainDetail.address}
          </AppText>
        </View>
      </View>
      <CourseList
        trailList={sentData.mountainDetail.trails}
        moveToCourseDetail={moveToCourseDetail}
      />
      <RankingList rankingList={rankingList} myRanking={myRanking} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 50,
  },
  mountainImg: {
    width: '100%',
    height: 180,
  },
  backgroundImg: {
    height: 350,
    paddingTop: 263,
  },
  titleWrapper: {
    marginLeft: 20,
    marginTop: 20,
  },
  titleText: {
    fontSize: 25,
  },
  iconInfoWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  icon: {
    color: '#57d696',
    marginRight: 10,
  },
  infoWrapper: {
    marginLeft: 20,
    marginTop: 20,
  },
  text: {
    marginBottom: 5,
    marginHorizontal: 10,
  },
});

export default MountainDetail;
