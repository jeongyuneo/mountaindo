import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  id: number;
  imageSrc: any;
  userName: string;
  totalDistance: number;
}

function RestaurantItem({id, imageSrc, userName, totalDistance}: Props) {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoText}>{id}</Text>
        <Image source={imageSrc} style={styles.imageSrc} />
        <Text style={styles.userInfoText}>{userName}님</Text>
      </View>
      <Text style={styles.distanceText}>{totalDistance}m</Text>
    </View>
  );
}

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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    marginHorizontal: 10,
  },
  imageSrc: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  distanceText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
export default RestaurantItem;
