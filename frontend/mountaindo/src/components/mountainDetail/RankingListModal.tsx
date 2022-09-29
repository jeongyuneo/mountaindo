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

  const dispatch = useAppDispatch();

  const onSearch = () => {
    dispatch(mountainRankingSearch({mountainId: 1, keyword: search}))
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const onChangeSearchInput = (text: any) => {
    setSearch(text.trim());
  };
  return (
    <Modal animationType="none" transparent={true} visible={visibleModal}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
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

            <AppTextBold style={styles.myRankingText}>내 랭킹</AppTextBold>
            <View style={styles.itemWrapper}>
              <View style={styles.userInfoWrapper}>
                <AppTextBold style={styles.userInfoText}>
                  {myRanking?.ranking}
                </AppTextBold>
                <Image source={myRanking?.imageUrl} style={styles.imageSrc} />
                <AppTextBold style={styles.userInfoText}>
                  {myRanking?.nickname}님
                </AppTextBold>
              </View>
              <AppTextBold>{myRanking?.accumulatedHeight}m</AppTextBold>
            </View>
            <AppTextBold style={styles.myRankingText}>전체 랭킹</AppTextBold>
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
});
export default RankingListModal;
