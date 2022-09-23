import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import RestaurantModal from './RestaurantModal';

interface Props {
  name: string;
  imageSrc: any;
  signatureMenu: string;
  location: string;
  operationTime: string;
  review: any;
}

function RestaurantItem({
  name,
  imageSrc,
  signatureMenu,
  location,
  operationTime,
  review,
}: Props) {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <View style={styles.itemWrapper}>
      <Pressable onPress={() => setVisibleModal(true)}>
        <Text style={styles.nameText}>{name}</Text>
        <Image source={imageSrc} style={styles.imageSrc} />
        <Text style={styles.contentText}>대표메뉴: {signatureMenu}</Text>
        <Text style={styles.contentText}>{location}</Text>
      </Pressable>
      {visibleModal && (
        <RestaurantModal
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          name={name}
          imageSrc={imageSrc}
          signatureMenu={signatureMenu}
          location={location}
          operationTime={operationTime}
          review={review}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginHorizontal: 10,
  },
  nameText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },
  imageSrc: {
    width: '100%',
    height: 90,
  },
  contentText: {
    fontSize: 10,
    color: 'black',
  },
});
export default RestaurantItem;
