import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

// TrailList에서 받아온 정보 타입 설정
interface Props {
  trail: string;
  trailId: number;
  level: string;
  timeDuration: string;
  location: string;
  visitedDate: string;
  modalVisible: any;
  setModalVisible: any;
  setModalNumber: any;
}
function TrailListItem({
  trail,
  trailId,
  level,
  timeDuration,
  location,
  visitedDate,
  modalVisible,
  setModalVisible,
  setModalNumber,
}: Props) {
  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        setModalVisible(!modalVisible);
        setModalNumber(trailId);
      }}>
      <View style={styles.titleGroup}>
        <View>
          <AppTextBold style={styles.title}>{trail}</AppTextBold>
        </View>
        <View>
          <AppText style={styles.date}>{visitedDate}</AppText>
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.labelGroup}>
          <AppText style={styles.label}>소요 시간</AppText>
          <AppText style={styles.label}>난이도</AppText>
          <AppText style={styles.label}>위치</AppText>
        </View>
        <View style={styles.textGroup}>
          <AppText style={styles.text}>{timeDuration}</AppText>
          <AppText style={styles.text}>{level}</AppText>
          <AppText style={styles.text}>{location}</AppText>
        </View>
        <View>
          <Image
            source={require('../../assets/jjang.png')}
            style={styles.mountainImage}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
  },
  date: {
    marginLeft: 10,
    fontSize: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mountainImage: {
    width: 80,
    height: 80,
  },
  labelGroup: {
    flex: 0.3,
  },
  textGroup: {
    flex: 0.6,
  },
  label: {
    marginBottom: 5,
    fontSize: 13,
  },
  text: {
    marginBottom: 5,
    fontSize: 13,
  },
});

export default TrailListItem;
