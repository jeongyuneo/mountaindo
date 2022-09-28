import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../../AppInner';
import Map from '../../components/hiking/Map';
import TrackingRoute from '../../components/hiking/TrackingRoute';
import {calDistance} from '../../utils';
import Config from 'react-native-config';
import axios from 'axios';

type HikingScreenProps = NativeStackScreenProps<LoggedInParamList, 'Hiking'>;

function Hiking({navigation}: HikingScreenProps) {
  // 내 현재 경도, 위도 값을 저장할 변수
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentLocation, setCurrentLocation] = useState(0); // 내 위치 버튼 클릭 시 재렌더링을 위한 변수

  const [isTracking, setIsTracking] = useState(false); // 등산 기록 여부 확인 변수
  const [tracking, setTracking] = useState(true); // 등산 기록 중인지 확인하기 위한 변수

  const [totalDist, setTotalDist] = useState(0); // 총 등산 거리를 저장할 변수
  const [totalHigh, setTotalHigh] = useState(0); // 총 고도를 저정할 변수
  const [currentWeather, setCurrentWeather] = useState(''); // 현재 날씨를 저장할 변수(흐림, 맑음, 비, 맑음, 눈)
  const [currentTemp, setCurrentTemp] = useState(''); // 현재 기온을 저장할 변수

  // 이동한 경로의 위도, 경도 좌표를 저장할 리스트
  const [coords, setCoords] = useState<
    {latitude: number | undefined; longitude: number | undefined}[] | []
  >(myPosition ? [myPosition] : []);

  const today = JSON.stringify(new Date()).split('T')[0].replace('"', ''); // 날짜 데이터를 문자열로 가공

  const [watchId, setWatchId] = useState(0);

  // 위치가 변화했을 때 변경된 좌표 정보를 리스트에 넣고 거리를 증가시킴
  const locationDataPush = () => {
    if (myPosition?.latitude && myPosition?.longitude) {
      if (
        !coords.some(
          item =>
            item.latitude === myPosition.latitude &&
            item.longitude === myPosition.longitude,
        )
      ) {
        setCoords([
          ...coords,
          {latitude: myPosition.latitude, longitude: myPosition.longitude},
        ]);
        getDistance();
      }
    }
  };

  // 이전좌표와 현재좌표 값을 비교해서 거리구하기
  const getDistance = () => {
    if (coords.length < 2) {
      return;
    }
    setTotalDist(
      prev =>
        parseFloat(prev.toString()) +
        parseFloat(
          calDistance(
            coords[coords.length - 1].latitude,
            coords[coords.length - 1].longitude,
            myPosition?.latitude,
            myPosition?.longitude,
          ),
        ),
    );
  };

  // 등산 시작, 종료 시점의 위치를 기반으로 고도 계산
  const getLocation = () => {
    Geolocation.getCurrentPosition(info => {
      if (!info.coords.altitude) return;

      if (totalHigh > 0) {
        const high = Math.floor(totalHigh - info.coords.altitude);
        setTotalHigh(high);
      } else {
        setTotalHigh(Math.floor(info.coords.altitude));
      }
    });
  };

  const watchPosition = () => {
    const idTest = Geolocation.watchPosition(
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
        distanceFilter: 10,
      },
    );
    setWatchId(idTest);
    locationDataPush();
  };
  // 현재 날씨 받아오기
  const getWeatherByCurrentLocation = async (lat: number, lon: number) => {
    const APIkey = Config.CURRENT_WEATHER_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
    // axios 호출
    await axios
      .get(url)
      .then(res => {
        setCurrentTemp(res.data.main.temp);
        if (res.data.weather[0].main === 'Wind') {
          setCurrentWeather('바람');
        } else if (res.data.weather[0].main === 'Rain') {
          setCurrentWeather('비');
        } else if (res.data.weather[0].main === 'Clounds') {
          setCurrentWeather('흐림');
        } else if (res.data.weather[0].main === 'Snow') {
          setCurrentWeather('눈');
        } else {
          setCurrentWeather('맑음');
        }
      })

      // 실패시 err 로그 출력
      .catch(err => {
        console.log(err);
      });
  };

  // 현재 위치 받아오기
  useEffect(() => {
    if (!tracking) {
      watchPosition();
    } else {
      Geolocation.clearWatch(watchId);
    }
  }, [myPosition, currentLocation, isTracking, tracking]);

  // 처음 화면 렌더링될 때 위치 정보 받아오기
  useEffect(() => {
    watchPosition();
  }, []);

  // 현재 위치를 받아온 후 날씨 정보 받아오기
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const latitude = info.coords.latitude;
        const longitude = info.coords.longitude;
        getWeatherByCurrentLocation(latitude, longitude);
      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );
  }, [currentWeather, currentTemp]);

  const wait = (timeout: any) => {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // 현재 위치를 받아오지 못했을 경우
  if (!myPosition || !myPosition.latitude) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text>사용자의 현재 위치를 받아오지 못했습니다</Text>
      </ScrollView>
    );
  }

  // 기록 종료 시 TrackingEnd 페이지로 이동 함수
  const moveToTrackingEnd = (timer: any) => {
    getLocation();
    navigation.navigate('TrackingEnd', {
      timer,
      coords: [
        ...coords,
        {latitude: myPosition.latitude, longitude: myPosition.longitude},
      ],
      totalDist: totalDist.toFixed(2),
      totalHigh,
      isTracking,
    });
    setCoords([]); // 등산 기록 종료 후 리스트 초기화
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
          <Text>
            {currentTemp} {currentWeather}
          </Text>
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
          onPress={() => {
            setIsTracking(true);
            getLocation();
            setCoords([
              ...coords,
              {
                latitude: myPosition?.latitude,
                longitude: myPosition?.longitude,
              },
            ]);
          }}>
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
      totalDist={totalDist.toFixed(2)}
      setTracking={setTracking}
      tracking={tracking}
      currentTemp={currentTemp}
      currentWeather={currentWeather}
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
  },
  textLabelGroup: {
    flex: 0.3,
  },
  textGroup: {
    flex: 0.7,
  },
  mapContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 30,
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
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Hiking;
