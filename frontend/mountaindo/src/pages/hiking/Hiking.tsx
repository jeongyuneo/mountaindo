import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../../AppInner';
import Map from '../../components/hiking/Map';
import TrackingRoute from '../../components/hiking/TrackingRoute';

type HikingScreenProps = NativeStackScreenProps<LoggedInParamList, 'Hiking'>;

function Hiking({navigation}: HikingScreenProps) {
  // 내 현재 경도, 위도 값을 저장할 변수
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentLocation, setCurrentLocation] = useState(0); // 내 위치 버튼 클릭 시 재렌더링을 위한 변수
  const [isTracking, setIsTracking] = useState(false); // 등산 기록 여부 확인 변수

  const array: ({latitude: number; longitude: number} | null)[] = []; // 경도, 위도값을 저장할 리스트
  const today = JSON.stringify(new Date()).split('T')[0].replace('"', ''); // 날짜 데이터를 문자열로 가공

  // 현재 위치 받아오기
  useEffect(() => {
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
        distanceFilter: 10, // 몇 미터마다 사용자의 위치를 체크할 것인지 설정
      },
    );
    array.push(myPosition);
  }, [myPosition, currentLocation]);

  // 현재 위치를 받아오지 못했을 경우
  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={styles.mapLoading}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }

  // 기록 종료 시 TrackingEnd 페이지로 이동 함수
  const moveToTrackingEnd = (timer: any) => {
    navigation.navigate('TrackingEnd', {timer: timer});
  };

  // isTracking이 false면 기본 정보와 지도 렌더링
  // true면 TrackingRoute 화면 렌더링
  return !isTracking ? (
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
      <View style={styles.mapContainer}>
        <Map myPosition={myPosition} />
      </View>
      <View style={styles.startButtonView}>
        <Pressable
          style={styles.startButton}
          onPress={() => setIsTracking(!isTracking)}>
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
  ) : (
    <TrackingRoute
      moveToTrackingEnd={moveToTrackingEnd}
      setIsTracking={setIsTracking}
    />
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
    height: Dimensions.get('window').height,
  },
  mapLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  startButtonView: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 100,
    top: Dimensions.get('window').height - 150,
  },
  myLocationButtonView: {
    position: 'absolute',
    left: Dimensions.get('window').width - 70,
    top: Dimensions.get('window').height - 150,
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
