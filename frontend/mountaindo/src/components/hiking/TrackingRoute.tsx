import {
  faCloud,
  faCloudRain,
  faPause,
  faSnowflake,
  faStop,
  faSun,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {formatTime} from '../../pages/hiking/Hiking';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';
import HikingAnimation from './HikingAnimation';
import StopWatch from './StopWatch';

interface Props {
  setIsTracking: any;
  totalDist: any;
  setTracking: any;
  tracking: any;
  currentWeather: any;
  endTracking: any;
  coords: any;
  myPosition: any;
  trailName: any;
  setIsSuccess: any;
  setEndTime: any;
}
function TrackingRoute({
  setIsTracking,
  totalDist,
  setTracking,
  tracking,
  currentWeather,
  endTracking,
  coords,
  myPosition,
  trailName,
  setIsSuccess,
  setEndTime,
}: Props) {
  const increment = useRef<any>(null); // ref의 current에서 setInterval 호출하여 사용하기 위해 변수 생성, 컴포넌트가 재렌더링되지 않음
  const [timer, setTimer] = useState(0); // 타이머 저장 변수

  // 타이머 시작 함수
  const handleStart = () => {
    setTracking(!tracking);
    {
      tracking
        ? (increment.current = setInterval(() => {
            setTimer((timer: any) => timer + 1);
          }, 1000))
        : clearInterval(increment.current);
    }
  };

  // 타이머 초기화 함수
  const handleReset = () => {
    clearInterval(increment.current);
    setTracking(true);
    setTimer(0);
    setIsTracking(false);
  };

  // 등산 중지 버튼 클릭 시 (중지 및 재시작)
  const stopTracking = useCallback(() => {
    if (!tracking) {
      Alert.alert('등산 기록 일시정지', '등산 기록을 일시정지하시겠습니까?', [
        {
          text: '네',
          onPress: () => {
            handleStart();
          },
        },
        {
          text: '아니오',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert('등산 기록 재개', '등산 기록을 다시 시작하시겠습니까?', [
        {
          text: '네',
          onPress: () => {
            handleStart();
          },
        },
        {
          text: '아니오',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ]);
    }
  }, [tracking]);

  // 등산 종료 버튼 클릭 시 (longPress -> 종료)
  const endHiking = useCallback(() => {
    if (timer < 5 || coords.length < 1 || !myPosition?.latitude) {
      return Alert.alert(
        '등산 기록 종료',
        '등산 기록을 저장할 수 없습니다. 그래도 종료하시겠습니까?',
        [
          {
            text: '네',
            onPress: () => {
              handleReset();
              endTracking();
              setEndTime(formatTime(timer));
            },
          },
          {
            text: '아니오',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else {
      return Alert.alert('등산 기록 종료', '등산 기록을 저장하시겠습니까?', [
        {
          text: '네',
          onPress: () => {
            handleReset();
            setIsSuccess(true);
            setEndTime(formatTime(timer));
          },
        },
        {
          text: '아니오',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ]);
    }
  }, [tracking, timer]);

  // 페이지 첫 접속 시 타이머 바로 시작
  useEffect(() => {
    handleStart();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textLabelGroup}>
        {currentWeather === '눈' ? (
          <FontAwesomeIcon
            icon={faSnowflake}
            size={15}
            color={'skyblue'}
            style={styles.weatherIcon}
          />
        ) : currentWeather === '흐림' ? (
          <FontAwesomeIcon
            icon={faCloud}
            size={15}
            color={'grey'}
            style={styles.weatherIcon}
          />
        ) : currentWeather === '비' ? (
          <FontAwesomeIcon
            icon={faCloudRain}
            size={15}
            color={'skyblue'}
            style={styles.weatherIcon}
          />
        ) : currentWeather === '바람' ? (
          <FontAwesomeIcon
            icon={faWind}
            size={15}
            color={'skyblue'}
            style={styles.weatherIcon}
          />
        ) : (
          <FontAwesomeIcon
            icon={faSun}
            size={15}
            color={'#FFCC29'}
            style={styles.weatherIcon}
          />
        )}
        <AppTextBold style={styles.trailText}>{trailName}</AppTextBold>
      </View>
      <View style={styles.distanceContainer}>
        <AppTextBold style={styles.distanceText}>{totalDist}</AppTextBold>
        <AppText style={styles.explainText}>km</AppText>
      </View>
      <View style={styles.timeContainer}>
        <StopWatch formatTime={formatTime} timer={timer} />
      </View>

      <View style={styles.icon}>
        <HikingAnimation />
      </View>
      <View style={styles.iconView}>
        <Pressable onPress={stopTracking} onLongPress={endHiking}>
          <FontAwesomeIcon
            icon={!tracking ? faStop : faPause}
            size={60}
            color={'white'}
          />
        </Pressable>
      </View>
      <AppTextBold style={styles.stopText}>길게 눌러 종료</AppTextBold>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  textLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 30,
    borderRadius: 30,
    paddingLeft: 20,
    paddingVertical: 15,
    marginTop: 20,
  },
  distanceContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 20,
  },
  distanceText: {
    fontSize: 100,
  },
  explainText: {
    fontSize: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  iconView: {
    alignItems: 'center',
    marginTop: 20,
    width: 90,
    height: 90,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: '#57d696',
    paddingVertical: 15,
  },
  weatherIcon: {
    marginBottom: 5,
  },
  stopText: {
    marginTop: 7,
  },
  trailText: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  icon: {
    width: 100,
    height: 80,
    marginVertical: 20,
  },
});

export default TrackingRoute;
