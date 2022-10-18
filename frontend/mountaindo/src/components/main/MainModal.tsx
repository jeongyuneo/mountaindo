import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import DismissKeyboardView from '../DismissKeyboardView';
import {Rankings} from '../../pages/Main';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';
import {useAppDispatch} from '../../store';
import {totalRankingSearch} from '../../slices/rankingSlice/ranking';
import Config from 'react-native-config';
import UserRankList from './UserRankList';

interface Props {
  isModalVisible: any;
  setIsModalVisible: any;
  goAllRank: any;
  rankingList: any;
  myRanking: any;
}

function MainModal({
  isModalVisible,
  setIsModalVisible,
  goAllRank,
  rankingList,
  myRanking,
}: Props) {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<Rankings | null>(null);
  const [isResult, setIsResult] = useState(0); // 0: 검색 전, 1: 검색 결과 없음, 2: 검색 결과 있음

  const dispatch = useAppDispatch();

  const onSearch = () => {
    dispatch(totalRankingSearch({keyword: search}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          if (res.payload?.nickname === null) {
            setIsResult(1);
          } else {
            setSearchResult({
              imageUrl: res.payload?.imageUrl,
              ranking: res.payload?.ranking,
              nickname: res.payload?.nickname,
              accumulatedHeight: res.payload?.accumulatedHeight,
            });
            setIsResult(2);
          }
        }
      })
      .catch(err => console.log(err));
  };

  const onChangeSearchInput = (text: any) => {
    if (!text.trim()) {
      setIsResult(0);
    }

    setSearch(text.trim());
  };

  return (
    <Modal animationType="none" transparent={true} visible={isModalVisible}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
          <Pressable
            onPress={() => {
              setIsModalVisible(!isModalVisible);
            }}>
            <AppTextBold style={styles.titleText}>산 전체 랭킹</AppTextBold>
            <TextInput
              style={styles.searchInput}
              onChangeText={onChangeSearchInput}
              placeholder="사용자 검색"
              placeholderTextColor="#666"
              importantForAutofill="yes"
              autoComplete="name"
              textContentType="name"
              value={search}
              returnKeyType="send"
              clearButtonMode="while-editing"
              onSubmitEditing={onSearch}
              blurOnSubmit={false}
            />
            {!!searchResult && isResult === 2 ? (
              <View>
                <AppTextBold style={styles.myRankingText}>
                  검색 결과
                </AppTextBold>
                <View style={styles.myItemWrapper}>
                  <View style={styles.userInfoWrapper}>
                    <AppTextBold style={styles.userInfoText}>
                      {searchResult?.ranking}
                    </AppTextBold>
                    {searchResult?.imageUrl === null ? (
                      <Image
                        source={require('../../assets/user.png')}
                        style={styles.imageSrc}
                      />
                    ) : (
                      <Image
                        source={{
                          uri:
                            Config.REACT_APP_BE_HOST + searchResult?.imageUrl,
                        }}
                        style={styles.imageSrc}
                      />
                    )}
                    <AppTextBold style={styles.userInfoText}>
                      {searchResult?.nickname}님
                    </AppTextBold>
                  </View>
                  <AppTextBold style={styles.meterStyle}>
                    {searchResult?.accumulatedHeight}m
                  </AppTextBold>
                </View>
              </View>
            ) : isResult === 0 ? (
              <></>
            ) : (
              <View>
                <AppTextBold style={styles.searchResult}>
                  검색 결과가 없습니다.
                </AppTextBold>
              </View>
            )}
            <AppTextBold style={styles.myRankingText}>내 랭킹</AppTextBold>
            <View style={styles.myItemWrapper}>
              <View style={styles.userInfoWrapper}>
                <AppTextBold style={styles.userInfoText}>
                  {myRanking?.ranking}
                </AppTextBold>
                {myRanking?.imageUrl === null ? (
                  <Image
                    source={require('../../assets/user.png')}
                    style={styles.imageSrc}
                  />
                ) : (
                  <Image
                    source={{
                      uri: Config.REACT_APP_BE_HOST + myRanking?.imageUrl,
                    }}
                    style={styles.imageSrc}
                  />
                )}
                <AppTextBold style={styles.userInfoText}>
                  {myRanking?.nickname}님
                </AppTextBold>
              </View>
              <AppTextBold style={styles.meterStyle}>
                {myRanking?.accumulatedHeight}m
              </AppTextBold>
            </View>
            <AppTextBold style={styles.myRankingText}>전체 랭킹</AppTextBold>
          </Pressable>
        </ScrollView>

        <View style={styles.userRankList}>
          <UserRankList rankingList={rankingList}></UserRankList>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  userRankList: {
    backgroundColor: 'white',
    width: '90%',
    flex: 35,
  },
  meterStyle: {
    marginRight: 5,
  },
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginVertical: '5%',
  },
  scrollView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    marginTop: 10,
    width: '90%',
  },
  titleText: {
    fontSize: 20,
    paddingTop: 15,
  },
  searchInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 300,
  },
  myRankingText: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: 6,
  },
  myItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(117, 207, 184, 0.5)',
    paddingVertical: 7,
    borderRadius: 10,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 12,
    marginHorizontal: 10,
  },
  imageSrc: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  searchResult: {
    marginVertical: 10,
  },
});

export default MainModal;
