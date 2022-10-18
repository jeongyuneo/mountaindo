import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {Rankings} from '../../pages/Main';
import {mountainRankingSearch} from '../../slices/rankingSlice/ranking';
import {useAppDispatch} from '../../store';
import AppTextBold from '../AppTextBold';
import RankingListItem from './RankingListItem';

interface Props {
  rankingList: any;
  myRanking: any;
  visibleModal: boolean;
  setVisibleModal: any;
}

function RankingListModal({
  rankingList,
  myRanking,
  visibleModal,
  setVisibleModal,
}: Props) {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<Rankings | null>(null);
  const [isResult, setIsResult] = useState(0); // 0: 검색 전, 1: 검색 결과 없음, 2: 검색 결과 있음

  const dispatch = useAppDispatch();

  const onSearch = () => {
    dispatch(mountainRankingSearch({mountainId: 1, keyword: search}))
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
    <Modal animationType="slide" transparent={true} visible={visibleModal}>
      <SafeAreaView style={styles.safeAreaView}>
        <Pressable
          onPress={() => setVisibleModal((visible: boolean) => !visible)}>
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
              <AppTextBold style={styles.myRankingText}>검색 결과</AppTextBold>
              <View style={styles.itemWrapper}>
                <View style={styles.userInfoWrapper}>
                  <AppTextBold style={styles.userInfoText}>
                    {searchResult?.ranking}
                  </AppTextBold>
                  <Image
                    source={searchResult?.imageUrl}
                    style={styles.imageSrc}
                  />
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
          <View style={styles.itemWrapper}>
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
                <Image source={myRanking?.imageUrl} style={styles.imageSrc} />
              )}
              <AppTextBold style={styles.userInfoText}>
                {myRanking?.nickname}님
              </AppTextBold>
            </View>
            <AppTextBold style={styles.meterText}>
              {myRanking?.accumulatedHeight}m
            </AppTextBold>
          </View>

          <AppTextBold style={styles.myRankingText}>전체 랭킹</AppTextBold>
        </Pressable>

        <ScrollView style={styles.scrollView}>
          <Pressable
            onPress={() => setVisibleModal((visible: boolean) => !visible)}>
            {rankingList?.length > 0 &&
              rankingList.map((item: Rankings, index: number) => (
                <RankingListItem
                  key={index}
                  ranking={item.ranking}
                  imageUrl={item.imageUrl}
                  nickname={item.nickname}
                  accumulatedHeight={item.accumulatedHeight}
                />
              ))}
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  meterText: {
    marginRight: 5,
  },
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: '40%',
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 5,
  },
  scrollView: {
    flex: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
    width: '100%',
  },
  titleText: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  searchInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: Dimensions.get('window').width,
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
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(117, 207, 184, 0.5)',
    paddingVertical: 7,
    marginHorizontal: 5,
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
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  searchResult: {
    marginVertical: 10,
  },
});
export default RankingListModal;
