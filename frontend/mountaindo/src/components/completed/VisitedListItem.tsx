import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {TrailType} from './VisitedList';

// VisitedList에서 받아온 정보 타입 설정
interface Props {
  mountain: string;
  location: string;
  trailList: TrailType[];
  moveToVisitedDetail: any;
}

function VisitedListItem({
  mountain,
  location,
  trailList,
  moveToVisitedDetail,
}: Props) {
  return (
    // 개별 아이템 클릭 시 디테일페이지로 이동(등산로 정보, 산 이름, 주소 정보 포함)
    <Pressable
      style={styles.item}
      onPress={() => {
        moveToVisitedDetail(trailList, mountain, location);
      }}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{mountain}</Text>
        <Text style={styles.content}>{location}</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/mountainOne.png')}
          style={styles.mountainImg}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  content: {
    fontSize: 15,
  },
  mountainImg: {
    width: 80,
    height: 80,
  },
});

export default VisitedListItem;
