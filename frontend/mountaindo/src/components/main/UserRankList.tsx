import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import {Rankings} from '../../pages/Main';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

interface Props {
  rankingList: any;
}

function UserRankList({rankingList}: Props) {
  return (
    <>
      <View>
        <ScrollView>
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
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  imageSrc: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  userInfoText: {
    fontSize: 12,
    marginHorizontal: 10,
  },
});

export default UserRankList;
