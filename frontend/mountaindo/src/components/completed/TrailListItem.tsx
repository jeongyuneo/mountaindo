import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

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
          <Text style={styles.title}>{trail}</Text>
        </View>
        <View>
          <Text style={styles.date}>{visitedDate}</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.labelGroup}>
          <Text style={styles.label}>소요 시간</Text>
          <Text style={styles.label}>난이도</Text>
          <Text style={styles.label}>위치</Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.text}>{timeDuration}</Text>
          <Text style={styles.text}>{level}</Text>
          <Text style={styles.text}>{location}</Text>
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
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
  },
  date: {
    marginLeft: 10,
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
  },
  text: {
    marginBottom: 5,
    color: 'black',
  },
});

export default TrailListItem;
