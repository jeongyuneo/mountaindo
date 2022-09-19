import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';
import Map from '../components/hiking/Map';

type HikingScreenProps = NativeStackScreenProps<LoggedInParamList, 'Hiking'>;

function Hiking({navigation}: HikingScreenProps) {
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentLocation, setCurrentLocation] = useState(0);

  const today = JSON.stringify(new Date()).split('T')[0].replace('"', ''); // 날짜 데이터를 문자열로 가공

  useEffect(() => {
    // watchPosition 사용자의 위치를 지속적으로 tracking
    // getCurrentPosition 사용자의 현재 위치
    Geolocation.watchPosition(
      info => {
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        // 몇 미터마다 사용자의 위치를 체크할 것인지 설정
        distanceFilter: 50,
      },
    );
  }, [currentLocation]);

  // 현재 위치를 받아오지 못했을 경우
  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={styles.mapLoading}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }

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
      <View
        // 화면 전체를 차지하도록 설정
        style={styles.mapContainer}>
        <Map myPosition={myPosition} />
      </View>
      <View style={styles.startButtonView}>
        <Pressable
          style={styles.startButton}
          onPress={() => navigation.navigate('TrackingRoute')}>
          <Text style={styles.buttonText}>등산 시작</Text>
        </Pressable>
      </View>
      <View style={styles.myLocationButtonView}>
        <Pressable
          style={styles.myLocationtButton}
          onPress={() => setCurrentLocation(curr => curr + 1)}>
          <Text style={styles.buttonText}>내 위치</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  mapContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 230,
  },
  mapLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  startButtonView: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 100,
    top: Dimensions.get('window').height - 180,
  },
  myLocationButtonView: {
    position: 'absolute',
    left: Dimensions.get('window').width - 70,
    top: Dimensions.get('window').height - 180,
  },
  startButton: {
    backgroundColor: 'green',
    width: 200,
    height: 50,
    borderRadius: 20,
  },
  myLocationtButton: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 15,
  },
});

export default Hiking;
