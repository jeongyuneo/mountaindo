import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';
import RestaurantItem from './RestaurantItem';
import RestaurantsDummy from './RestaurantsDummy';

function Facilites() {
  return (
    <View>
      <AppTextBold style={styles.titleText}>주변 편의 시설</AppTextBold>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/facilities.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.howToComeWrapper}>
        <AppTextBold style={styles.howToComeTitle}>찾아오는 길</AppTextBold>
        <View>
          <AppTextBold style={styles.howToComeSubtitle}>
            서울(소요시간 약 2시간 20분)
          </AppTextBold>
          <AppText style={styles.howToComeContent}>
            센트럴(호남)터미널-&gt;유성 금호고속터미널-&gt;도보로 10분
            유성시외버스터미널 앞 정류장 107번 버스-&gt;동학사 정류장
            하차-&gt;계룡산사무소{' '}
          </AppText>
          <AppText style={styles.howToComeContent}>
            서울남부터미널-&gt;동학사삼거리-&gt;107번 버스-&gt;동학사주차장-&gt;
            계룡산사무소
          </AppText>
        </View>
        <View>
          <AppTextBold style={styles.howToComeSubtitle}>
            부산(소요시간 약 5시간)
          </AppTextBold>
          <AppText style={styles.howToComeContent}>
            부산종합버스터미널-&gt;대전복합버스터미널-&gt;102번
            버스-&gt;현충원역, 107번 환승-&gt;동학사 정류장
            하차-&gt;계룡산사무소
          </AppText>
        </View>
      </View>
      <View style={styles.restaurantsWrapper}>
        <AppTextBold style={styles.restaurantsTitle}>주변 맛집</AppTextBold>
        <View style={styles.itemsWrapper}>
          <ScrollView horizontal={true}>
            {RestaurantsDummy.map(item => (
              <RestaurantItem
                name={item.name}
                imageSrc={item.imageSrc}
                signatureMenu={item.signatureMenu}
                location={item.location}
                operationTime={item.operationTime}
                review={item.review}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
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
    fontSize: 15,
  },
  howToComeSubtitle: {
    marginTop: 10,
  },
  howToComeContent: {
    fontSize: 10,
  },
  restaurantsWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  restaurantsTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  itemsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default Facilites;
