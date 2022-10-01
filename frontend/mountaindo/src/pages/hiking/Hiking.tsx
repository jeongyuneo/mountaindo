import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../../AppInner';
import TrackingRoute from '../../components/hiking/TrackingRoute';
import {calDistance} from '../../utils';
import Config from 'react-native-config';
import axios from 'axios';
import AppTextBold from '../../components/AppTextBold';
import TrackingEnd from '../../components/hiking/TrackingEnd';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch} from '../../store';
import {endHiking} from '../../slices/hikingSlice/hiking';
import TrackingStart from '../../components/hiking/TrackingStart';

type HikingScreenProps = NativeStackScreenProps<LoggedInParamList, 'Hiking'>;

function Hiking({navigation, route}: HikingScreenProps) {
  // 내 현재 경도, 위도 값을 저장할 변수
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isTracking, setIsTracking] = useState(false); // 등산 기록 여부 확인 변수
  const [tracking, setTracking] = useState(true); // 등산 기록 중인지 확인하기 위한 변수

  const [totalDist, setTotalDist] = useState(0); // 총 등산 거리를 저장할 변수
  const [totalHigh, setTotalHigh] = useState(0); // 총 고도를 저정할 변수
  const [currentWeather, setCurrentWeather] = useState(''); // 현재 날씨를 저장할 변수(흐림, 맑음, 비, 맑음, 눈)

  const [isHikingEnd, setIsHikingEnd] = useState(false); // 등산 기록 종료 여부를 확인하는 변수
  const [timer, setTimer] = useState(0); // 타이머 저장 변수
  const [isSuccess, setIsSuccess] = useState(false);
  const [endTime, setEndTime] = useState('');

  const isFocused = useIsFocused(); // 화면에 focus 여부를 확인하는 변수
  const dispatch = useAppDispatch();

  // 이동한 경로의 위도, 경도 좌표를 저장할 리스트
  const [coords, setCoords] = useState<
    {latitude: number | undefined; longitude: number | undefined}[] | []
  >(myPosition ? [myPosition] : []);

  const today = JSON.stringify(new Date()).split('T')[0].replace('"', ''); // 날짜 데이터를 문자열로 가공

  const [watchId, setWatchId] = useState(0); // 등산 기록 중지 시 위치 트래킹으로 초기화 하기 위한 변수

  const trailId = route.params?.trailId;
  const trailName = route.params?.trailName;

  useEffect(() => {
    if (!trailId || !trailName) {
      return;
    }

    if (!route.params?.trailId) {
      navigation.navigate('FindMountain');
    }
  }, [trailId, trailName]);

  useEffect(() => {
    // 등산 중에는 header 안보이도록 설정
    if (isTracking && !isHikingEnd && !isSuccess) {
      navigation.setOptions({
        headerShown: false,
      });
    } else if (!isTracking && !isHikingEnd && isSuccess) {
      navigation.setOptions({
        headerShown: true,
        title: '등산 종료',
      });
    } else {
      navigation.setOptions({
        headerShown: true,
        title: '등산 시작',
      });
    }
  }, [isTracking, navigation, isHikingEnd, isSuccess, isFocused]);

  // timer에 저장한 시간 포멧팅 함수
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
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

  // 위치 트래킹 함수
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
  }, [myPosition, isTracking, tracking]);

  // 처음 화면 렌더링될 때 위치 정보 받아오기
  useEffect(() => {
    watchPosition();
  }, []);

  // 등산 기록이 종료 되었을 때 isHikingEnd 값 변경
  useEffect(() => {
    if (!isTracking && isHikingEnd && isSuccess) {
      setIsHikingEnd(!isHikingEnd);
      setIsSuccess(false);
    }
  }, [isHikingEnd, isFocused, isSuccess]);

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
  }, [currentWeather]);

  const wait = (timeout: any) => {
    watchPosition();
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
        <AppTextBold>사용자의 현재 위치를 받아오지 못했습니다</AppTextBold>
      </ScrollView>
    );
  }

  // 기록 종료 시 TrackingEnd 이동 함수
  const moveToTrackingEnd = (time: any) => {
    getLocation();
    dispatch(
      endHiking({
        trailId,
        path: [
          ...coords,
          {latitude: myPosition.latitude, longitude: myPosition.longitude},
        ],
        endPoint: myPosition,
        accumulatedHeight: totalHigh,
        distance: totalDist.toFixed(2),
        useTime: time,
      }),
    )
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setIsSuccess(true);
          setEndTime(time);
          // setCoords([]); // 등산 기록 종료 후 리스트 초기화
        } else {
          Alert.alert('알림', '등산 기록 저장에 실패했습니다.');
        }
      })
      .catch(err => {
        console.log(err);
        setIsSuccess(false);
      });
  };

  // 등산 기록 종료 시 변수 초기화
  const endTracking = () => {
    setCoords([]);
    setIsSuccess(false);
    setIsHikingEnd(false);
    setTotalDist(0);
    setTotalHigh(0);
    setIsHikingEnd(false);
    setIsSuccess(false);
    navigation.setOptions({
      headerShown: true,
      title: '등산 시작',
    });
  };

  return !isTracking && !isHikingEnd && !isSuccess ? (
    <TrackingStart
      currentWeather={currentWeather}
      trailName={trailName}
      myPosition={myPosition}
      setIsTracking={setIsTracking}
      getLocation={getLocation}
      setCoords={setCoords}
      coords={coords}
    />
  ) : isTracking && !isHikingEnd && !isSuccess ? (
    <TrackingRoute
      moveToTrackingEnd={moveToTrackingEnd}
      setIsTracking={setIsTracking}
      totalDist={totalDist.toFixed(2)}
      setTracking={setTracking}
      tracking={tracking}
      currentWeather={currentWeather}
      timer={timer}
      formatTime={formatTime}
      setTimer={setTimer}
      endTracking={endTracking}
      coords={coords}
      myPosition={myPosition}
      trailName={trailName}
    />
  ) : !isTracking && !isHikingEnd && isSuccess ? (
    <TrackingEnd
      today={today}
      timer={endTime}
      coords={[
        ...coords,
        {latitude: myPosition.latitude, longitude: myPosition.longitude},
      ]}
      totalDist={totalDist.toFixed(2)}
      totalHigh={totalHigh}
      setCoords={setCoords}
      trailName={trailName}
      currentWeather={currentWeather}
    />
  ) : (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <AppTextBold>사용자의 현재 위치를 받아오지 못했습니다</AppTextBold>
    </ScrollView>
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
    left: Dimensions.get('window').width / 2 - 120,
    top: Dimensions.get('window').height - 150,
  },
  startButton: {
    width: 250,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#75CFB8',
    paddingVertical: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Hiking;
