import React from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

function Photo() {
  const dummyImg = require('../../assets/mountainOne.jpeg');
  const dummyImg1 = require('../../assets/mountainTwo.jpeg');
  const dummyImg2 = require('../../assets/mountainThree.jpeg');
  const dummyImg3 = require('../../assets/mountainFour.jpeg');
  const colors = [dummyImg, dummyImg1, dummyImg2, dummyImg3];

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        data={colors}
        renderItem={({item}) => <Image source={item} style={styles.imgFull} />}
      />
    </View>
  );
}

// 화면 전체 넓이 차지
const Width = Dimensions.get('window').width; //스크린 너비 초기화
const Height = Dimensions.get('window').height; //스크린 높이 초기화

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgFull: {
    width: Width,
    height: Height * 0.3,
  },
});

export default Photo;
