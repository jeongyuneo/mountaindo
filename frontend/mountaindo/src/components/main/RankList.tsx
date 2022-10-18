import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {Rankings} from '../../pages/Main';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';
import Config from 'react-native-config';

interface Props {
  goAllRank: any;
  rankingList: any;
}
function MainRankList({goAllRank, rankingList}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.rankStart}>
        <View style={styles.rankHeader}>
          <AppTextBold style={styles.rankTitle}>
            MountainDo 전체랭킹
          </AppTextBold>
          <View style={styles.goModal}>
            <Pressable onPress={goAllRank}>
              <AppText style={styles.rankAll}>전체 랭킹 보기</AppText>
            </Pressable>
            <FontAwesomeIcon
              icon={faAngleDown}
              size={12}
              style={styles.angleDown}
            />
          </View>
        </View>
        <View>
          <AppText style={styles.rankSubTitle}>
            랭킹은 등산 누적 고도를 기반으로 결정됩니다.
          </AppText>
        </View>
      </View>

      <View>
        {rankingList?.length > 0 &&
          rankingList.map((item: Rankings, index: number) =>
            index < 3 ? (
              <View key={index} style={styles.itemWrapper}>
                <View style={styles.userInfoWrapper}>
                  <AppTextBold style={styles.userInfoText}>
                    {item.ranking}
                  </AppTextBold>
                  {item.imageUrl !== null ? (
                    <Image
                      source={{uri: Config.REACT_APP_BE_HOST + item.imageUrl}}
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
            ) : null,
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  rankStart: {
    paddingVertical: 10,
    paddingBottom: 1,
  },
  angleDown: {
    marginTop: 3,
    marginLeft: 2,
    color: '#6892D5',
  },
  goModal: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 3,
    color: 'gray',
    alignItems: 'center',
  },
  styleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rankTitle: {
    fontSize: 17,
    marginLeft: 3,
    marginBottom: 3,
  },
  rankAll: {
    fontSize: 12,
  },
  rankSubTitle: {
    fontSize: 11,
    marginLeft: 3,
    marginBottom: 3,
  },
  rankList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
  imgStyle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 0.7,
    borderColor: 'gray',
    borderStyle: 'solid',
    marginRight: 5,
  },
  rankNum: {
    fontSize: 13,
    marginRight: 10,
  },
  nameStyle: {
    fontSize: 13,
  },
  namePix: {
    marginLeft: 5,
    fontSize: 13,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: 6,
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
export default MainRankList;
