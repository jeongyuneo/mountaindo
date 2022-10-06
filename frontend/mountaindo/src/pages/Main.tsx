// React
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Component
import {LoggedInParamList} from '../../AppInner';
import MainModal from '../components/main/MainModal';
import RankList from '../components/main/RankList';
import EasyMountain from '../components/main/EasyMountain';
import Photo from '../components/main/Photo';
import {useAppDispatch} from '../store';
import {totalRanking} from '../slices/rankingSlice/ranking';
import AppTextBold from '../components/AppTextBold';
import {
  getMountainDetail,
  getRecommendTrailList,
} from '../slices/mountainSlice/mountain';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {LoadingAnimationC} from '../components/completed/LoadingAnimation';
import AppText from '../components/AppText';

// 랭킹의 타입 설정
export type Rankings = {
  imageUrl: any;
  ranking: number;
  nickname: string;
  accumulatedHeight: number;
};

export type RecommendType = {
  trailName: string;
  mountainName: string;
  mountainImage: string;
  mountainId: number;
};

type MainInScreenProps = NativeStackScreenProps<LoggedInParamList, '홈'>;
function Main({navigation}: MainInScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rankingList, setRankingList] = useState<Rankings[] | null[]>([]); // 전체 랭킹 리스트를 저장할 변수
  const [myRanking, setMyRanking] = useState<Rankings | null>(null); // 내 랭킹 정보를 저장할 변수
  const [lastVisitedTrailBased, setLastVisitedTrailBased] = useState<
    RecommendType[] | []
  >([]);
  const [memberBased, setMemberBased] = useState<RecommendType[] | []>([]);
  const [surveyBased, setSurveyBased] = useState<RecommendType[] | []>([]);

  const dispatch = useAppDispatch();

  const isPending = useSelector((state: RootState) => state.mountain.isPending);

  const goAllRank = () => {
    setIsModalVisible(!isModalVisible);
  };

  // 화면을 처음 렌더링할 때 전체 랭킹리스트 요청
  useEffect(() => {
    dispatch(totalRanking(''))
      // 요청 성공시 내 랭킹과 전체 랭킹 저장
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setMyRanking({
            imageUrl: res.payload?.imageUrl,
            ranking: res.payload?.ranking,
            nickname: res.payload?.nickname,
            accumulatedHeight: res.payload?.accumulatedHeight,
          });
          setRankingList(res.payload?.rankings);
        }
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

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getRecommendTrailList(''))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setLastVisitedTrailBased(res.payload.lastVisitedTrailBased);
          setMemberBased(res.payload.memberBased);
          setSurveyBased(res.payload.surveyBased);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [isFocused, lastVisitedTrailBased, memberBased, surveyBased]);

  // 산 상세 API 요청 보내기
  const dispatchMountainDetail = (mountainId: number) => {
    dispatch(getMountainDetail({mountainId: mountainId}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigation.navigate('MountainDetail', {
            mountainDetail: res.payload,
          });
        }
      })
      .catch((err: any) => {
        console.log('MOUNTAIN_DETAIL', err);
      });
  };

  return (
    <View style={styles.containerMain}>
      {isPending ? (
        <LoadingAnimationC />
      ) : (
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

            {lastVisitedTrailBased.length > 0 && (
              <View style={styles.mountainList}>
                <AppTextBold style={styles.easyTitle}>
                  최근 방문한 산과 비슷한 등산 코스
                </AppTextBold>
                <EasyMountain
                  lastVisitedTrailBased={lastVisitedTrailBased}
                  recommend={'lastVisitedTrailBased'}
                  dispatchMountainDetail={dispatchMountainDetail}
                />
              </View>
            )}
            {memberBased.length > 0 && (
              <View>
                <AppTextBold style={styles.easyTitle}>
                  나와 비슷한 사용자들이 많이 방문한 코스
                </AppTextBold>
                <EasyMountain
                  memberBased={memberBased}
                  recommend={'memberBased'}
                  dispatchMountainDetail={dispatchMountainDetail}
                />
              </View>
            )}
            <Pressable
              onPress={() => {
                dispatchMountainDetail(12);
              }}>
              <AppText>test</AppText>
            </Pressable>
            {surveyBased.length > 0 && (
              <View>
                <AppTextBold style={styles.easyTitle}>
                  이런 코스에 방문해보는건 어떠세요?
                </AppTextBold>
                <EasyMountain
                  surveyBased={surveyBased}
                  recommend={'surveyBased'}
                  dispatchMountainDetail={dispatchMountainDetail}
                />
              </View>
            )}
            {lastVisitedTrailBased.length < 1 &&
              memberBased.length < 1 &&
              surveyBased.length < 1 && (
                <View style={styles.container}>
                  <AppTextBold>추천 목록을 불러오지 못했습니다.</AppTextBold>
                  <AppTextBold>다시 시도해주세요!</AppTextBold>
                </View>
              )}
          </View>
        </ScrollView>
      )}
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
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
  container: {
    marginHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Main;
