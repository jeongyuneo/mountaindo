import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LoggedInParamList} from '../../../AppInner';
import AppText from '../../components/AppText';
import MountainListItem from '../../components/mountain/MountainListItem';
import SearchedMountainListItem from '../../components/mountain/SearchedMountainListItem';
import mountainSlice, {
  getMountainDetail,
  getMountainList,
  getSearchedMountain,
  getSearchedTrail,
} from '../../slices/mountainSlice/mountain';
import {useAppDispatch} from '../../store';
import {RootState} from '../../store/reducer';
import SearchSubjectPicker from '../../components/mountain/SearchSubjectPicker';

type MountainScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'Mountain'
>;

export type MountainType = {
  address: string;
  height: number;
  hot: boolean;
  imageUrl: string;
  mountainId: number;
  name: string;
};

export type MountainListType = {
  address: string;
  height: number;
  hot: boolean;
  imageUrl: string;
  mountainId: number;
  name: string;
}[];

export type MountainDetailType = {
  address: string;
  height: number;
  hot: boolean;
  imageUrl: string;
  name: string;
  trails: [];
};

function Mountain({navigation}: MountainScreenProps) {
  const dispatch = useAppDispatch();
  const [isResult, setIsResult] = useState(0); // 0 : 검색 전, 1: 검색 결과 없음, 2: 검색 결과 있음
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<MountainType[] | []>([]);
  const [isName, setIsName] = useState(true);
  const [isPopularity, setIsPopularity] = useState(false);
  const [isHighHeight, setIsHighHeight] = useState(false);
  const [isLowHeight, setIsLowHeight] = useState(false);
  const [isTotal, setIsTotal] = useState(true);
  const [isSeoul, setIsSeoul] = useState(false);
  const [isIncheon, setIsIncheon] = useState(false);
  const [isGyeonggi, setIsGyeonggi] = useState(false);
  const [isGangwon, setIsGangwon] = useState(false);
  const [isSejong, setIsSejong] = useState(false);
  const [isDaejeon, setIsDaejeon] = useState(false);
  const [isChungbuk, setIsChungbuk] = useState(false);
  const [isChungnam, setIsChungnam] = useState(false);
  const [isJeonbuk, setIsJeonbuk] = useState(false);
  const [isGwangju, setIsGwangju] = useState(false);
  const [isJeonnam, setIsJeonnam] = useState(false);
  const [isDaegu, setIsDaegu] = useState(false);
  const [isGyeongbuk, setIsGyeongbuk] = useState(false);
  const [isBusan, setIsBusan] = useState(false);
  const [isOulsan, setIsOulsan] = useState(false);
  const [isGyengnam, setIsGyeongnam] = useState(false);
  const [isJeju, setIsJeju] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('산');
  const mountainList: MountainListType = useSelector(
    (state: RootState) => state.mountain.mountainList,
  );
  const page = useSelector((state: RootState) => state.mountain.page);
  const standard = useSelector((state: RootState) => state.mountain.standard);
  const location = useSelector((state: RootState) => state.mountain.location);

  const onChangeSearch = useCallback(text => {
    setSearchInput(text.trim());
  }, []);

  // 전체 산 목록 API 요청 보내기 (이름순, 인기순, 고도 높은 순, 고도 낮은 순, 지역별 태그)
  const dispatchMountainList: any = useCallback(
    (standardArg: any, locationArg: string, pageArg: number) => {
      dispatch(
        getMountainList({
          standard: standardArg,
          location: locationArg,
          page: pageArg,
        }),
      )
        .then(res => {
          if (res.meta.requestStatus === 'fulfilled') {
            console.log('MOUNTAINLIST RES ==>', res);
          }
        })
        .catch((err: any) => {
          console.log('MOUNTAINLIST ERR ==>', err);
        });
    },
    [],
  );

  // 특정 산 검색 API 요청 보내가
  const dispatchSearchedMountain = () => {
    if (selectedSubject === '산') {
      dispatch(
        getSearchedMountain({
          keyword: searchInput,
          standard: standard,
          location: location,
        }),
      )
        .then(res => {
          if (res.meta.requestStatus === 'fulfilled') {
            if (res.payload.length > 0) {
              setIsResult(2);
              setSearchResult(res.payload);
            } else {
              setIsResult(1);
            }
          }
        })
        .catch((err: any) => {
          console.log('SEARCHED_MOUNTAIN ERR ==>', err);
        });
    } else if (selectedSubject === '등산로') {
      dispatch(
        getSearchedTrail({
          keyword: searchInput,
          standard: standard,
          location: location,
        }),
      )
        .then(res => {
          if (res.meta.requestStatus === 'fulfilled') {
            if (res.payload.length > 0) {
              setIsResult(2);
              setSearchResult(res.payload);
            } else {
              setIsResult(1);
            }
          }
        })
        .catch((err: any) => {
          console.log('SEARCHED_MOUNTAIN ERR ==>', err);
        });
    }
  };

  // 특정 산 검색 API 요청 보내가 - 이미 검색한 상태에서
  const dispatchSearchedMountainAgain = (
    standardArg: string,
    locationArg: string,
  ) => {
    if (selectedSubject === '산') {
      dispatch(
        getSearchedMountain({
          keyword: searchInput,
          standard: standardArg,
          location: locationArg,
        }),
      )
        .then(res => {
          if (res.meta.requestStatus === 'fulfilled') {
            if (res.payload.length > 0) {
              setIsResult(2);
              setSearchResult(res.payload);
            } else {
              setIsResult(1);
            }
          }
        })
        .catch((err: any) => {
          console.log('SEARCHED_MOUNTAIN ERR ==>', err);
        });
    } else if (selectedSubject === '등산로') {
      dispatch(
        getSearchedTrail({
          keyword: searchInput,
          standard: standardArg,
          location: locationArg,
        }),
      )
        .then(res => {
          if (res.meta.requestStatus === 'fulfilled') {
            if (res.payload.length > 0) {
              setIsResult(2);
              setSearchResult(res.payload);
            } else {
              setIsResult(1);
            }
          }
        })
        .catch((err: any) => {
          console.log('SEARCHED_MOUNTAIN ERR ==>', err);
        });
    }
  };

  // 산 상세 API 요청 보내기
  const dispatchMountainDetail = (mountainId: number) => {
    dispatch(getMountainDetail({mountainId: mountainId}))
      .then(res => {
        console.log('MOUNTAIN_DETAIL', res);
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

  const getData = (
    standardArg: string,
    locationArg: string,
    pageArg: number,
  ) => {
    setLoading(true);
    dispatchMountainList(standardArg, locationArg, pageArg);
    setLoading(false);
  };

  const onEndReached = () => {
    if (!loading) {
      getData(standard, location, page);
    }
  };

  useEffect(() => {
    dispatch(mountainSlice.actions.setInitialMountainList());
    dispatch(mountainSlice.actions.setInitialPage());
    dispatch(mountainSlice.actions.setStandard({standard: 'name'}));
    dispatchMountainList('name', '전체', 0);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View>
        <View style={styles.iconInputPikerWrapper}>
          <View style={styles.iconSearchWrapper}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={styles.iconMagnifying}
            />
            <TextInput
              style={styles.searchInputText}
              onChangeText={onChangeSearch}
              placeholder="검색할 산/등산로 이름을 입력해주세요"
              textContentType="none"
              returnKeyType="send"
              clearButtonMode="while-editing"
              onSubmitEditing={dispatchSearchedMountain}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.searchSubjectPicker}>
            <SearchSubjectPicker
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
            />
          </View>
        </View>
        <View>
          {isResult === 0 ? (
            <ScrollView horizontal={true}>
              <View style={styles.citiesWrapper}>
                {isTotal ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>전체</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '전체'}),
                      );
                      dispatchMountainList(standard, '전체', 0);
                      setIsTotal(true);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>전체</AppText>
                    </View>
                  </Pressable>
                )}
                {isSeoul ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>서울</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '서울'}),
                      );
                      dispatchMountainList(standard, '서울', 0);
                      setIsTotal(false);
                      setIsSeoul(true);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>서울</AppText>
                    </View>
                  </Pressable>
                )}
                {isIncheon ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>인천</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '인천'}),
                      );
                      dispatchMountainList(standard, '인천', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(true);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>인천</AppText>
                    </View>
                  </Pressable>
                )}
                {isGyeonggi ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>경기</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '경기'}),
                      );
                      dispatchMountainList(standard, '경기', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(true);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>경기</AppText>
                    </View>
                  </Pressable>
                )}
                {isGangwon ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>강원</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '강원'}),
                      );
                      dispatchMountainList(standard, '강원', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(true);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>강원</AppText>
                    </View>
                  </Pressable>
                )}
                {isSejong ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>세종</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '세종'}),
                      );
                      dispatchMountainList(standard, '세종', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(true);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>세종</AppText>
                    </View>
                  </Pressable>
                )}
                {isDaejeon ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>대전</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '대전'}),
                      );
                      dispatchMountainList(standard, '대전', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(true);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>대전</AppText>
                    </View>
                  </Pressable>
                )}
                {isChungbuk ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>충북</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '충청북'}),
                      );
                      dispatchMountainList(standard, '충청북', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(true);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>충북</AppText>
                    </View>
                  </Pressable>
                )}
                {isChungnam ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>충남</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '충청남'}),
                      );
                      dispatchMountainList(standard, '충청남', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(true);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>충남</AppText>
                    </View>
                  </Pressable>
                )}
                {isJeonbuk ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>전북</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '전라북'}),
                      );
                      dispatchMountainList(standard, '전라북', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(true);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>전북</AppText>
                    </View>
                  </Pressable>
                )}
                {isGwangju ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>광주</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '광주'}),
                      );
                      dispatchMountainList(standard, '광주', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(true);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>광주</AppText>
                    </View>
                  </Pressable>
                )}
                {isJeonnam ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>전남</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '전라남'}),
                      );
                      dispatchMountainList(standard, '전라남', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(true);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>전남</AppText>
                    </View>
                  </Pressable>
                )}
                {isDaegu ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>대구</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '대구'}),
                      );
                      dispatchMountainList(standard, '대구', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(true);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>대구</AppText>
                    </View>
                  </Pressable>
                )}
                {isGyeongbuk ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>경북</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '경상북'}),
                      );
                      dispatchMountainList(standard, '경상북', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(true);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>경북</AppText>
                    </View>
                  </Pressable>
                )}
                {isBusan ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>부산</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '부산'}),
                      );
                      dispatchMountainList(standard, '부산', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(true);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>부산</AppText>
                    </View>
                  </Pressable>
                )}
                {isOulsan ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>울산</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '울산'}),
                      );
                      dispatchMountainList(standard, '울산', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(true);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>울산</AppText>
                    </View>
                  </Pressable>
                )}
                {isGyengnam ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>경남</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '경상남'}),
                      );
                      dispatchMountainList(standard, '경상남', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(true);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>경남</AppText>
                    </View>
                  </Pressable>
                )}
                {isJeju ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>제주</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '제주'}),
                      );
                      dispatchMountainList(standard, '제주', 0);
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(true);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>제주</AppText>
                    </View>
                  </Pressable>
                )}
              </View>
            </ScrollView>
          ) : (
            <ScrollView horizontal={true}>
              <View style={styles.citiesWrapper}>
                {isTotal ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>전체</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '전체'}),
                      );
                      dispatchSearchedMountainAgain(standard, '전체');
                      setIsTotal(true);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>전체</AppText>
                    </View>
                  </Pressable>
                )}
                {isSeoul ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>서울</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '서울'}),
                      );
                      dispatchSearchedMountainAgain(standard, '서울');
                      setIsTotal(false);
                      setIsSeoul(true);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>서울</AppText>
                    </View>
                  </Pressable>
                )}
                {isIncheon ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>인천</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '인천'}),
                      );
                      dispatchSearchedMountainAgain(standard, '인천');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(true);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>인천</AppText>
                    </View>
                  </Pressable>
                )}
                {isGyeonggi ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>경기</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '경기'}),
                      );
                      dispatchSearchedMountainAgain(standard, '경기');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(true);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>경기</AppText>
                    </View>
                  </Pressable>
                )}
                {isGangwon ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>강원</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '강원'}),
                      );
                      dispatchSearchedMountainAgain(standard, '강원');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(true);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>강원</AppText>
                    </View>
                  </Pressable>
                )}
                {isSejong ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>세종</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '세종'}),
                      );
                      dispatchSearchedMountainAgain(standard, '세종');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(true);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>세종</AppText>
                    </View>
                  </Pressable>
                )}
                {isDaejeon ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>대전</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '대전'}),
                      );
                      dispatchSearchedMountainAgain(standard, '대전');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(true);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>대전</AppText>
                    </View>
                  </Pressable>
                )}
                {isChungbuk ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>충북</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '충청북'}),
                      );
                      dispatchSearchedMountainAgain(standard, '충청북');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(true);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>충북</AppText>
                    </View>
                  </Pressable>
                )}
                {isChungnam ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>충남</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '충청남'}),
                      );
                      dispatchSearchedMountainAgain(standard, '충청남');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(true);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>충남</AppText>
                    </View>
                  </Pressable>
                )}
                {isJeonbuk ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>전북</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '전라북'}),
                      );
                      dispatchSearchedMountainAgain(standard, '전라북');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(true);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>전북</AppText>
                    </View>
                  </Pressable>
                )}
                {isGwangju ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>광주</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '광주'}),
                      );
                      dispatchSearchedMountainAgain(standard, '광주');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(true);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>광주</AppText>
                    </View>
                  </Pressable>
                )}
                {isJeonnam ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>전남</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '전라남'}),
                      );
                      dispatchSearchedMountainAgain(standard, '전라남');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(true);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>전남</AppText>
                    </View>
                  </Pressable>
                )}
                {isDaegu ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>대구</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '대구'}),
                      );
                      dispatchSearchedMountainAgain(standard, '대구');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(true);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>대구</AppText>
                    </View>
                  </Pressable>
                )}
                {isGyeongbuk ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>경북</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '경상북'}),
                      );
                      dispatchSearchedMountainAgain(standard, '경상북');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(true);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>경북</AppText>
                    </View>
                  </Pressable>
                )}
                {isBusan ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>부산</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '부산'}),
                      );
                      dispatchSearchedMountainAgain(standard, '부산');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(true);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>부산</AppText>
                    </View>
                  </Pressable>
                )}
                {isOulsan ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>울산</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '울산'}),
                      );
                      dispatchSearchedMountainAgain(standard, '울산');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(true);
                      setIsGyeongnam(false);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>울산</AppText>
                    </View>
                  </Pressable>
                )}
                {isGyengnam ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>경남</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '경상남'}),
                      );
                      dispatchSearchedMountainAgain(standard, '경상남');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(true);
                      setIsJeju(false);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>경남</AppText>
                    </View>
                  </Pressable>
                )}
                {isJeju ? (
                  <View style={styles.cityWrapperActive}>
                    <AppText style={styles.cityTextActive}>제주</AppText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setLocation({location: '제주'}),
                      );
                      dispatchSearchedMountainAgain(standard, '제주');
                      setIsTotal(false);
                      setIsSeoul(false);
                      setIsIncheon(false);
                      setIsGyeonggi(false);
                      setIsGangwon(false);
                      setIsSejong(false);
                      setIsDaejeon(false);
                      setIsChungbuk(false);
                      setIsChungnam(false);
                      setIsJeonbuk(false);
                      setIsGwangju(false);
                      setIsJeonnam(false);
                      setIsDaegu(false);
                      setIsGyeongbuk(false);
                      setIsBusan(false);
                      setIsOulsan(false);
                      setIsGyeongnam(false);
                      setIsJeju(true);
                    }}>
                    <View style={styles.cityWrapper}>
                      <AppText style={styles.cityText}>제주</AppText>
                    </View>
                  </Pressable>
                )}
              </View>
            </ScrollView>
          )}
          {isResult === 0 ? (
            <ScrollView horizontal={true}>
              <View style={styles.tagsWrapper}>
                {isName ? (
                  <Pressable style={styles.tagWrapperActive}>
                    <AppText style={styles.tagTextActive}>이름순</AppText>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setStandard({standard: 'name'}),
                      );
                      dispatchMountainList('name', location, 0);
                      setIsPopularity(false);
                      setIsName(true);
                      setIsHighHeight(false);
                      setIsLowHeight(false);
                    }}
                    style={styles.tagWrapper}>
                    <AppText style={styles.tagText}>이름순</AppText>
                  </Pressable>
                )}
                {isPopularity ? (
                  <Pressable style={styles.tagWrapperActive}>
                    <AppText style={styles.tagTextActive}>인기순</AppText>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setStandard({
                          standard: 'popularity',
                        }),
                      );
                      dispatchMountainList('popularity', location, 0);
                      setIsPopularity(true);
                      setIsName(false);
                      setIsHighHeight(false);
                      setIsLowHeight(false);
                    }}
                    style={styles.tagWrapper}>
                    <AppText style={styles.tagText}>인기순</AppText>
                  </Pressable>
                )}
                {isHighHeight ? (
                  <Pressable style={styles.tagWrapperActive}>
                    <AppText style={styles.tagText2Active}>
                      고도 높은 순
                    </AppText>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setStandard({
                          standard: 'high-height',
                        }),
                      );
                      dispatchMountainList('high-height', location, 0);
                      setIsPopularity(false);
                      setIsName(false);
                      setIsHighHeight(true);
                      setIsLowHeight(false);
                    }}
                    style={styles.tagWrapper}>
                    <AppText style={styles.tagText2}>고도 높은 순</AppText>
                  </Pressable>
                )}
                {isLowHeight ? (
                  <Pressable style={styles.tagWrapperActive}>
                    <AppText style={styles.tagText2Active}>
                      고도 낮은 순
                    </AppText>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(
                        mountainSlice.actions.setStandard({
                          standard: 'low-height',
                        }),
                      );
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatchMountainList('low-height', location, 0);
                      setIsPopularity(false);
                      setIsName(false);
                      setIsHighHeight(false);
                      setIsLowHeight(true);
                    }}
                    style={styles.tagWrapper}>
                    <AppText style={styles.tagText2}>고도 낮은 순</AppText>
                  </Pressable>
                )}
              </View>
            </ScrollView>
          ) : (
            <ScrollView horizontal={true}>
              <View style={styles.tagsWrapper}>
                {isName ? (
                  <Pressable style={styles.tagWrapperActive}>
                    <AppText style={styles.tagTextActive}>이름순</AppText>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setStandard({standard: 'name'}),
                      );
                      dispatchSearchedMountainAgain('name', location);
                      setIsPopularity(false);
                      setIsName(true);
                      setIsHighHeight(false);
                      setIsLowHeight(false);
                    }}
                    style={styles.tagWrapper}>
                    <AppText style={styles.tagText}>이름순</AppText>
                  </Pressable>
                )}
                {isPopularity ? (
                  <Pressable style={styles.tagWrapperActive}>
                    <AppText style={styles.tagTextActive}>인기순</AppText>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setStandard({
                          standard: 'popularity',
                        }),
                      );
                      dispatchSearchedMountainAgain('popularity', location);
                      setIsPopularity(true);
                      setIsName(false);
                      setIsHighHeight(false);
                      setIsLowHeight(false);
                    }}
                    style={styles.tagWrapper}>
                    <AppText style={styles.tagText}>인기순</AppText>
                  </Pressable>
                )}
                {isHighHeight ? (
                  <Pressable style={styles.tagWrapperActive}>
                    <AppText style={styles.tagText2Active}>
                      고도 높은 순
                    </AppText>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatch(
                        mountainSlice.actions.setStandard({
                          standard: 'high-height',
                        }),
                      );
                      dispatchSearchedMountainAgain('high-height', location);
                      setIsPopularity(false);
                      setIsName(false);
                      setIsHighHeight(true);
                      setIsLowHeight(false);
                    }}
                    style={styles.tagWrapper}>
                    <AppText style={styles.tagText2}>고도 높은 순</AppText>
                  </Pressable>
                )}
                {isLowHeight ? (
                  <Pressable style={styles.tagWrapperActive}>
                    <AppText style={styles.tagText2Active}>
                      고도 낮은 순
                    </AppText>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(
                        mountainSlice.actions.setStandard({
                          standard: 'low-height',
                        }),
                      );
                      dispatch(mountainSlice.actions.setInitialMountainList());
                      dispatch(mountainSlice.actions.setInitialPage());
                      dispatchSearchedMountainAgain('low-height', location);
                      setIsPopularity(false);
                      setIsName(false);
                      setIsHighHeight(false);
                      setIsLowHeight(true);
                    }}
                    style={styles.tagWrapper}>
                    <AppText style={styles.tagText2}>고도 낮은 순</AppText>
                  </Pressable>
                )}
              </View>
            </ScrollView>
          )}
        </View>
        {!!searchResult && isResult === 2 ? (
          <View>
            {searchResult.map(item => (
              <Pressable
                onPress={() => {
                  dispatchMountainDetail(item.mountainId);
                }}>
                <SearchedMountainListItem
                  address={item.address}
                  height={item.height}
                  hot={item.hot}
                  imageUrl={item.imageUrl}
                  mountainId={item.mountainId}
                  name={item.name}
                />
              </Pressable>
            ))}
          </View>
        ) : isResult === 0 ? (
          <View>
            {mountainList?.length > 0 && (
              <FlatList
                data={mountainList}
                keyExtractor={item => String(item.mountainId)}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.6}
                refreshing={false}
                renderItem={({item}) => {
                  const {
                    address,
                    height,
                    hot,
                    imageUrl,
                    mountainId,
                    name,
                  }: MountainType = item;
                  return (
                    <Pressable
                      onPress={() => {
                        dispatchMountainDetail(item.mountainId);
                      }}>
                      <MountainListItem
                        address={address}
                        height={height}
                        hot={hot}
                        imageUrl={imageUrl}
                        mountainId={mountainId}
                        name={name}
                      />
                    </Pressable>
                  );
                }}
              />
            )}
          </View>
        ) : (
          <View style={styles.searchResultWrapper}>
            <AppText style={styles.searchResult}>검색 결과가 없습니다.</AppText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: '100%',
    padding: 15,
  },
  iconInputPikerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  iconSearchWrapper: {
    flexDirection: 'row',
  },
  iconMagnifying: {
    marginTop: 15,
  },
  searchInputText: {
    paddingHorizontal: 10,
    fontSize: 12,
  },
  searchSubjectPicker: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 20,
  },
  citiesWrapper: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  cityWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 3,
    elevation: 3,
  },
  cityText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  cityWrapperActive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 30,
    backgroundColor: '#57d696',
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 3,
    elevation: 3,
  },
  cityTextActive: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tagsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  tagWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 73,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 3,
    elevation: 3,
  },
  tagWrapperActive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 77,
    height: 30,
    backgroundColor: '#57d696',
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 3,
    elevation: 3,
  },
  tagText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  tagText2: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  tagTextActive: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tagText2Active: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  searchResultWrapper: {
    alignItems: 'center',
    marginVertical: 50,
  },
  searchResult: {
    fontSize: 15,
  },
});

export default Mountain;
