import {faPause, faStop} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

function TrackingRoute() {
  const [tracking, setTracking] = useState(true);
  const today = JSON.stringify(new Date()).split('T')[0].replace('"', ''); // 날짜 데이터를 문자열로 가공

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.textLabelGroup}>
          <Text>오늘의 날씨</Text>
          <Text>오늘의 정보</Text>
          <Text>산 정보</Text>
        </View>
        <View style={styles.textGroup}>
          <Text>맑음</Text>
          <Text>{today}</Text>
          <Text>계룡산</Text>
        </View>
      </View>
      <View style={styles.distanceContainer}>
        <Text style={styles.distanceText}>7.05</Text>
        <Text style={styles.explainText}>킬로미터</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>등산시간</Text>
        <Text style={styles.timeText}>01 : 30 : 01</Text>
      </View>
      <View style={styles.iconView}>
        <Text onPress={() => setTracking(!tracking)}>
          <FontAwesomeIcon icon={tracking ? faStop : faPause} size={60} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  textContainer: {
    marginHorizontal: 10,
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
  distanceContainer: {
    alignItems: 'center',
  },
  distanceText: {
    fontWeight: 'bold',
    fontSize: 100,
    color: 'black',
  },
  explainText: {
    fontSize: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  timeText: {
    fontSize: 20,
  },
  iconView: {
    alignItems: 'center',
    marginTop: 30,
  },
});

export default TrackingRoute;
