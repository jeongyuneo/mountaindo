import React, {useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {Rankings} from '../../pages/Main';
import AppTextBold from '../AppTextBold';
import RankingListItem from './RankingListItem';
import RankingListModal from './RankingListModal';

interface Props {
  rankingList: any;
  myRanking: any;
  mountainName: string;
}

function CourseList({rankingList, myRanking, mountainName}: Props) {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <View>
      <Pressable
        style={styles.rankingListWrapper}
        onPress={() => setVisibleModal(true)}>
        <AppTextBold style={styles.rankingTitle}>
          {mountainName} 랭킹
        </AppTextBold>
        {rankingList?.length > 0 &&
          rankingList.map((item: Rankings, index: number) =>
            index < 3 ? (
              <RankingListItem
                key={index}
                ranking={item.ranking}
                imageUrl={item.imageUrl}
                nickname={item.nickname}
                accumulatedHeight={item.accumulatedHeight}
              />
            ) : null,
          )}
      </Pressable>
      {visibleModal && (
        <RankingListModal
          rankingList={rankingList}
          myRanking={myRanking}
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
