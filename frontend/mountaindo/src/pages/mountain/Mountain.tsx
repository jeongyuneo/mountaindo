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
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('산');
  const mountainList: MountainListType = useSelector(
    (state: RootState) => state.mountain.mountainList,
  );
  const page = useSelector((state: RootState) => state.mountain.page);
  const standard = useSelector((state: RootState) => state.mountain.standard);

  const onChangeSearch = useCallback(text => {
    setSearchInput(text.trim());
  }, []);

  // 전체 산 목록 API 요청 보내기 (이름순, 인기순, 고도 높은 순, 고도 낮은 순)
  const dispatchMountainList: any = useCallback(
    (standardArg: any, pageArg: number) => {
      dispatch(getMountainList({standard: standardArg, page: pageArg}))
        .then(res => {
          if (res.meta.requestStatus === 'fulfilled') {
            dispatch(
              mountainSlice.actions.setStandard({standard: standardArg}),
            );
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
      dispatch(getSearchedMountain({keyword: searchInput}))
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
      dispatch(getSearchedTrail({keyword: searchInput}))
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

  const getData = (standardArg: string, pageArg: number) => {
    setLoading(true);
    dispatchMountainList(standardArg, pageArg);
    setLoading(false);
  };

  const onEndReached = () => {
    if (!loading) {
      getData(standard, page);
    }
  };

  useEffect(() => {
    dispatch(mountainSlice.actions.setInitialMountainList());
    dispatch(mountainSlice.actions.setInitialPage());
    dispatch(mountainSlice.actions.setStandard({standard: 'name'}));
    dispatchMountainList('name', 0);
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
          <ScrollView horizontal={true}>
            <View style={styles.citiesWrapper}>
              <View style={styles.cityWrapper}>
                <AppText style={styles.cityText}>수도권</AppText>
              </View>
              <View style={styles.cityWrapper}>
                <AppText style={styles.cityText}>강원도</AppText>
              </View>
              <View style={styles.cityWrapper}>
                <AppText style={styles.cityText}>충청도</AppText>
              </View>
              <View style={styles.cityWrapper}>
                <AppText style={styles.cityText}>경상도</AppText>
              </View>
              <View style={styles.cityWrapper}>
                <AppText style={styles.cityText}>전라도</AppText>
              </View>
              <View style={styles.cityWrapper}>
                <AppText style={styles.cityText}>제주도</AppText>
              </View>
            </View>
          </ScrollView>
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
                    dispatchMountainList('name', 0);
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
                    dispatchMountainList('popularity', 0);
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
                  <AppText style={styles.tagText2Active}>고도 높은 순</AppText>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(mountainSlice.actions.setInitialMountainList());
                    dispatch(mountainSlice.actions.setInitialPage());
                    dispatchMountainList('high-height', 0);
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
                  <AppText style={styles.tagText2Active}>고도 낮은 순</AppText>
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
                    dispatchMountainList('low-height', 0);
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
    backgroundColor: '#eeeeee',
    height: '100%',
    padding: 15,
  },
  iconInputPikerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  iconSearchWrapper: {
    flexDirection: 'row',
  },
  iconMagnifying: {
    marginTop: 15,
  },
  searchInputText: {
    paddingHorizontal: 10,
  },
  searchSubjectPicker: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 20,
    // borderBottomWidth: 1,
  },
  citiesWrapper: {
    flexDirection: 'row',
  },
  cityWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 77,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  cityText: {
    fontWeight: 'bold',
  },
  tagsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 77,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 3,
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
  },
  tagText: {
    fontWeight: 'bold',
  },
  tagText2: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tagTextActive: {
    color: 'white',
    fontWeight: 'bold',
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
