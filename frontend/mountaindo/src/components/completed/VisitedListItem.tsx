import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';
import {TrailType} from './VisitedList';

// VisitedList에서 받아온 정보 타입 설정
interface Props {
  mountainName: string;
  address: string;
  lastHikingDate: string;
  lastHikingTrailName: string;
  moveToVisitedDetail: any;
}

function VisitedListItem({
  mountainName,
  address,
  lastHikingDate,
  lastHikingTrailName,
  moveToVisitedDetail,
}: Props) {
  return (
    // 개별 아이템 클릭 시 디테일페이지로 이동(등산로 정보, 산 이름, 주소 정보 포함)
    <Pressable
      style={styles.item}
      onPress={() => {
        moveToVisitedDetail();
      }}>
      <View style={styles.textContainer}>
        <AppTextBold style={styles.title}>{mountainName}</AppTextBold>
        <AppText style={styles.content}>{address}</AppText>
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
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
  },
  content: {
    fontSize: 13,
  },
  mountainImg: {
    width: 80,
    height: 80,
  },
});

export default VisitedListItem;
