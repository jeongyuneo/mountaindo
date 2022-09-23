import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import RestaurantItem from './RestaurantItem';
import RestaurantsDummy from './RestaurantsDummy';

function Facilites() {
  return (
    <View>
      <Text style={styles.titleText}>주변 편의 시설</Text>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/facilities.png')}
          style={styles.image}
        />
      </View>
			<View style={styles.howToComeWrapper}>
				<Text style={styles.howToComeTitle}>찾아오는 길</Text>
				<View>
					<Text style={styles.howToComeSubtitle}>서울(소요시간 약 2시간 20분)</Text>		
					<Text style={styles.howToComeContent}>센트럴(호남)터미널->유성 금호고속터미널->도보로 10분 유성시외버스터미널 앞 정류장 107번 버스->동학사 정류장 하차->계룡산사무소 </Text>
					<Text style={styles.howToComeContent}>서울남부터미널->동학사삼거리->107번 버스->동학사주차장-> 계룡산사무소</Text>
				</View>
				<View>
					<Text style={styles.howToComeSubtitle}>부산(소요시간 약 5시간)</Text>
					<Text style={styles.howToComeContent}>부산종합버스터미널->대전복합버스터미널->102번 버스->현충원역, 107번 환승->동학사 정류장 하차->계룡산사무소</Text>
				</View>
			</View>
			<View style={styles.restaurantsWrapper}>
				<Text style={styles.restaurantsTitle}>주변 맛집</Text>
				<View style={styles.itemsWrapper}>
					{RestaurantsDummy.map(item => (
						<RestaurantItem name={item.name} imageSrc={item.imageSrc} signatureMenu={item.signatureMenu} location={item.location} operationTime={item.operationTime} review={item.review}/>
					))}
				</View>
			</View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 20,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 180,
  },
	howToComeWrapper: {
		marginHorizontal: 20,
		marginTop: 10,
	},
	howToComeTitle: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 15,
	},
	howToComeSubtitle: {
		color: 'black',
		fontWeight: 'bold',
		marginTop: 10,
	},
	howToComeContent: {
		color: 'black',
		fontSize: 10,
	},
	restaurantsWrapper: {
		marginHorizontal: 20,
		marginTop: 20,
	},
	restaurantsTitle: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 15,
		marginBottom: 10,
	},
	itemsWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	}
});

export default Facilites;
