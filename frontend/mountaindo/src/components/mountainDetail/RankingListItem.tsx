import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import AppTextBold from '../AppTextBold';

interface Props {
  ranking: number;
  imageUrl: any;
  nickname: string;
  accumulatedHeight: number;
}

function RestaurantItem({
  ranking,
  imageUrl,
  nickname,
  accumulatedHeight,
}: Props) {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.userInfoWrapper}>
        <AppTextBold style={styles.userInfoText}>{ranking}</AppTextBold>
        {imageUrl === null ? (
          <Image
            source={require('../../assets/user.png')}
            style={styles.imageSrc}
          />
        ) : (
          <Image source={imageUrl} style={styles.imageSrc} />
        )}
        <AppTextBold style={styles.userInfoText}>{nickname}님</AppTextBold>
      </View>
      <AppTextBold>{accumulatedHeight}m</AppTextBold>
    </View>
  );
}

// <Image source={imageUrl} style={styles.imageSrc} />
// {item.imageUrl !== null ? (
//   <Image
//     source={{
//       uri: Config.REACT_APP_BE_HOST + item.imageUrl,
//     }}
//     style={styles.imageSrc}
//   />
// ) : (
//   <Image
//     source={require('../../assets/user.png')}
//     style={styles.imageSrc}
//   />
// )}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
export default RestaurantItem;
