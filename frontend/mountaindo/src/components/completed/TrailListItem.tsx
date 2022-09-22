import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

// TrailList에서 받아온 정보 타입 설정
interface Props {
  trail: string;
  level: string;
  timeDuration: string;
  location: string;
  visitedDate: string;
}
function TrailListItem({
  trail,
  level,
  timeDuration,
  location,
  visitedDate,
}: Props) {
  return (
    <View style={styles.itemContainer}>
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
          <Text>소요 시간</Text>
          <Text>난이도</Text>
          <Text>위치</Text>
        </View>
        <View style={styles.textGroup}>
          <Text>{timeDuration}</Text>
          <Text>{level}</Text>
          <Text>{location}</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/mountainOne.png')}
            style={styles.mountainImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 15,
  },
  titleGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
  },
  date: {
    flex: 0.5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mountainImage: {
    width: 50,
    height: 50,
  },
  labelGroup: {
    flex: 0.3,
  },
  textGroup: {
    flex: 0.4,
  },
});

export default TrailListItem;
