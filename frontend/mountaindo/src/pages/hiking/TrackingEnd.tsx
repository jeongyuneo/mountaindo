import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

type TrackingEndScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'TrackingEnd'
>;

function TrackingEnd({navigation, route}: TrackingEndScreenProps) {
  const today = JSON.stringify(new Date()).split('T')[0].replace('"', ''); // 날짜 데이터를 문자열로 가공
  const timer = route.params?.timer; // 총 시간 정보 Hiking 페이지에서 받아와서 저장

  useEffect(() => {
    if (!timer) {
      return;
    }
  }, [timer, route.params?.timer]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>등산 종료</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/gps-sample.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textLabelGroup}>
          <Text style={styles.text}>일시</Text>
          <Text style={styles.text}>장소</Text>
          <Text style={styles.text}>소요시간</Text>
          <Text style={styles.text}>총 거리</Text>
          <Text style={styles.text}>총 고도</Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.text}>{today}</Text>
          <Text style={styles.text}>대전광역시 계룡산</Text>
          <Text style={styles.text}>{route.params?.timer}</Text>
          <Text style={styles.text}>7.5 km</Text>
          <Text style={styles.text}>500 m</Text>
        </View>
      </View>
      <View style={styles.moveButton}>
        <Pressable
          onPress={() => navigation.navigate('Main')}
          style={styles.button}>
          <Text style={styles.buttonText}>메인페이지로 이동</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  title: {
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  textContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    marginBottom: 30,
  },
  textLabelGroup: {
    flex: 0.3,
  },
  textGroup: {
    flex: 0.7,
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
  },
  moveButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'grey',
    width: 200,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default TrackingEnd;