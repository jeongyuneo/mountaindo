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
          <Pressable onPress={goAllRank}>
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
                  <AppTextBold>{searchResult?.accumulatedHeight}m</AppTextBold>
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
              <AppTextBold>{myRanking?.accumulatedHeight}m</AppTextBold>
              <AppTextBold style={styles.myRankingText}>전체 랭킹</AppTextBold>
            </View>
            <View>
              {rankingList?.length > 0 &&
                rankingList.map((item: Rankings, index: number) => (
                  <View key={index} style={styles.itemWrapper}>
                    <View style={styles.userInfoWrapper}>
                      <AppTextBold style={styles.userInfoText}>
                        {item.ranking}
                      </AppTextBold>
                      {item.imageUrl !== null ? (
                        <Image
                          source={{
                            uri: Config.REACT_APP_BE_HOST + item.imageUrl,
                          }}
                          style={styles.imageSrc}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/user.png')}
                          style={styles.imageSrc}
                        />
                      )}
                      <AppTextBold style={styles.userInfoText}>
                        {item.nickname}님
                      </AppTextBold>
                    </View>
                    <AppTextBold>{item.accumulatedHeight}m</AppTextBold>
                  </View>
                ))}
            </View>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // userTitle: {
  //   marginTop: 5,
  //   marginLeft: 7,
  //   marginBottom: 5,
  //   fontSize: 13,
  // },
  // myRank: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginVertical: 3,
  //   marginHorizontal: 10,
  //   paddingVertical: 10,
  //   paddingHorizontal: 5,
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
  // myRankTitle: {
  //   marginLeft: 7,
  //   marginVertical: 10,
  //   fontSize: 13,
  // },
  // magnify: {
  //   marginTop: 17,
  //   marginLeft: 10,
  // },
  // find: {
  //   paddingBottom: 0,
  //   marginLeft: 3,
  //   fontFamily: 'NanumBarunGothic',
  // },
  // findInput: {
  //   flexDirection: 'row',
  //   borderBottomWidth: 1,
  //   marginHorizontal: 5,
  //   marginRight: 20,
  //   marginBottom: 10,
  // },
  // mainFlex: {
  //   backgroundColor: 'white',
  // },
  // modalHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // closeModal: {
  //   marginTop: 8,
  //   marginRight: 10,
  //   fontSize: 20,
  // },
  // modalTitle: {
  //   fontSize: 17,
  //   paddingTop: 10,
  //   paddingLeft: 5,
  // },
  // styleRow: {
  //   flexDirection: 'row',
  //   alignItems: 'flex-end',
  // },
  // rankList: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginVertical: 7,
  //   marginHorizontal: 10,
  //   alignItems: 'flex-end',
  // },
  // imgStyle: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: 50,
  //   borderWidth: 0.7,
  //   borderColor: 'gray',
  //   borderStyle: 'solid',
  //   marginRight: 5,
  // },
  // rankNum: {
  //   fontSize: 15,
  //   marginRight: 10,
  // },
  // nameStyle: {
  //   fontSize: 15,
  // },
  // namePix: {
  //   marginLeft: 5,
  //   fontSize: 15,
  // },
  // searchResult: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 30,
  //   marginHorizontal: 10,
  //   alignItems: 'center',
  // },
  // result: {
  //   marginVertical: 10,
  // },
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginVertical: '5%',
  },
  scrollView: {
    flex: 0.9,
    borderRadius: 5,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  titleText: {
    fontSize: 20,
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
