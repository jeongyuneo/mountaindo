import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {faFire} from '@fortawesome/free-solid-svg-icons';
import AppText from '../AppText';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

interface Props {
  address: string;
  height: number;
  hot: boolean;
  imageUrl: string;
  mountainId: number;
  name: string;
}

function SearchedMountainListItem({
  address,
  height,
  hot,
  imageUrl,
  mountainId,
  name,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContentWrapper}>
        <Image
          source={require('../../assets/gyeryongMountain.jpg')}
          style={styles.image}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.nameIconWrapper}>
            <AppText style={styles.nameText}>{name}</AppText>
            <View>
              {hot ? (
                <FontAwesomeIcon icon={faFire} style={styles.iconFire} />
              ) : (
                <View />
              )}
            </View>
          </View>
          <AppText style={styles.heightText}>{height}m</AppText>
          <AppText style={styles.addressText}>{address}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 7,
    marginHorizontal: 15,
    borderRadius: 20,
    padding: 5,
    backgroundColor: 'white',
    elevation: 5,
  },
  imageContentWrapper: {
    flexDirection: 'row',
  },
  contentWrapper: {
    marginLeft: 25,
  },
  nameIconWrapper: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  nameText: {
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
  image: {
    height: 60,
    width: 80,
    borderRadius: 15,
  },
  iconFire: {
    color: 'red',
  },
  heightText: {
    fontSize: 12,
  },
  addressText: {
    fontSize: 12,
  },
});

export default SearchedMountainListItem;
