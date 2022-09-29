// React
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Component
import {LoggedInParamList} from '../../AppInner';
import MainModal from '../components/main/MainModal';
import RankList from '../components/main/RankList';
import EasyMountain from '../components/main/EasyMountain';
import Photo from '../components/main/Photo';
import {dummyEasy, dummyAge} from '../components/main/Dummy';
import AgeMountain from '../components/main/AgeMountain';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch} from '../store';
import {totalRanking} from '../slices/rankingSlice/ranking';
import AppTextBold from '../components/AppTextBold';
import AppText from '../components/AppText';

// 랭킹의 타입 설정
export type Rankings = {
  imageUrl: any;
  ranking: number;
  nickname: string;
  accumulatedHeight: number;
};

type MainInScreenProps = NativeStackScreenProps<LoggedInParamList, 'Main'>;
function Main({navigation}: MainInScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rankingList, setRankingList] = useState<Rankings[] | null[]>([]); // 전체 랭킹 리스트를 저장할 변수
  const [myRanking, setMyRanking] = useState<Rankings | null>(null); // 내 랭킹 정보를 저장할 변수

  const dispatch = useAppDispatch();

  const goAllRank = () => {
    setIsModalVisible(!isModalVisible);
  };

  // 화면을 처음 렌더링할 때 전체 랭킹리스트 요청
  useEffect(() => {
    dispatch(totalRanking(''))
      // 요청 성공시 내 랭킹과 전체 랭킹 저장
      .then(res => {
        setMyRanking({
          imageUrl: res.payload?.imageUrl,
          ranking: res.payload?.ranking,
          nickname: res.payload?.nickname,
          accumulatedHeight: res.payload?.accumulatedHeight,
        });
        setRankingList(res.payload?.rankings);
      })
      .catch(err => {
        console.log();
      });
  }, []);

  // 만약 전체 랭킹과 내 랭킹의 정보가 아직 들어오지 않았다면 재렌더링
  useEffect(() => {
    if (!myRanking?.ranking || !rankingList || rankingList.length < 1) {
      return;
    }
  }, [myRanking?.ranking, rankingList]);

  return (
    <View style={styles.containerMain}>
      <ScrollView>
        <MainModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          goAllRank={goAllRank}
          rankingList={rankingList}
          myRanking={myRanking}
        />
        <View style={styles.photoContainer}>
          <Photo />
        </View>

        <View style={styles.suggestionContainer}>
          <View style={styles.rankList}>
            <RankList goAllRank={goAllRank} rankingList={rankingList} />
          </View>

          <View>
            <View style={styles.mountainList}>
              <AppTextBold style={styles.easyTitle}>
                쉬운 난이도의 등산 코스
              </AppTextBold>
              <View style={styles.goList}>
                <Pressable onPress={() => navigation.navigate('MainDetail')}>
                  <AppText style={styles.mountainAll}>
                    전체 산 목록 보기
                  </AppText>
                </Pressable>
                <FontAwesomeIcon
                  icon={faAngleDown}
                  size={12}
                  style={styles.angleDown}
                />
              </View>
            </View>
            <EasyMountain dummyEasy={dummyEasy} />
          </View>

          <View>
            <AppTextBold style={styles.easyTitle}>
              20대에게 인기있는 등산 코스
            </AppTextBold>
            <AgeMountain dummyAge={dummyAge} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  goList: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 12,
    color: 'gray',
    alignItems: 'flex-start',
  },
  angleDown: {
    marginTop: 3,
    marginLeft: 2,
  },
  mountainAll: {
    fontSize: 12,
  },
  mountainList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerMain: {
    flex: 1,
  },
  photoContainer: {
    flex: 1.2,
  },
  suggestionContainer: {
    flex: 2,
    marginHorizontal: 20,
  },
  easyTitle: {
    marginLeft: 3,
    paddingVertical: 10,
  },
  rankList: {
    marginVertical: 10,
  },
});

export default Main;
