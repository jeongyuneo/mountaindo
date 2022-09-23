import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import RankingListDummy from './RankingListDummy';
import RankingListItem from './RankingListItem';
import RankingListModal from './RankingListModal';

function CourseList() {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <View>
      <Pressable
        style={styles.rankingListWrapper}
        onPress={() => setVisibleModal(true)}>
        <Text style={styles.rankingTitle}>
          {RankingListDummy[0].mountain} 랭킹
        </Text>
        {RankingListDummy[0].rankingList.map(item => (
          <RankingListItem
            id={item.id}
            imageSrc={item.imageSrc}
            userName={item.userName}
            totalDistance={item.totalDistance}
          />
        ))}
      </Pressable>
      {visibleModal && (
        <RankingListModal
          RankingListDummy={RankingListDummy}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rankingListWrapper: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  rankingTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default CourseList;
