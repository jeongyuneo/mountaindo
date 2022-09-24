import React from 'react';
import {
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import RankingListItem from './RankingListItem';

interface Props {
  RankingListDummy: {
    id: number;
    mountain: string;
    rankingList: {
      id: number;
      imageSrc: any;
      userName: string;
      totalDistance: number;
    }[];
  }[];
  visibleModal: boolean;
  setVisibleModal: any;
}

function RankingListModal({
  RankingListDummy,
  visibleModal,
  setVisibleModal,
}: Props) {
  return (
    <Modal animationType="none" transparent={true} visible={visibleModal}>
      <SafeAreaView
        // eslint-disable-next-line react-native/no-inline-styles
        style={styles.safeAreaView}>
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          style={styles.scrollView}>
          <Pressable
            onPress={() => setVisibleModal((visible: boolean) => !visible)}>
            <Text style={styles.titleText}>
              {RankingListDummy[0].mountain} 전체 랭킹
            </Text>
            <TextInput style={styles.searchInput} />
            <Text style={styles.myRankingText}>내 랭킹</Text>
            {RankingListDummy[0].rankingList.map(item => (
              <RankingListItem
                id={item.id}
                imageSrc={item.imageSrc}
                userName={item.userName}
                totalDistance={item.totalDistance}
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  searchInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 300,
  },
  myRankingText: {
    color: 'black',
    fontSize: 15,
    marginVertical: 20,
  },
});
export default RankingListModal;
