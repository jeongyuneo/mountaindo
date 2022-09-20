import {faPause, faStop} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import StopWatch from './StopWatch';

// moveToTrackingEnd: Hiking 페이지에서 받아오는 TrackingEnd 페이지 이동 함수
// setIsTracking: Hiking  페이지에서 받아오는 기록 여부 확인 함수

function TrackingRoute({moveToTrackingEnd, setIsTracking}: any) {
  const [tracking, setTracking] = useState(true); // 등산 기록 중인지 확인하기 위한 변수
  const [timer, setTimer] = useState(0); // 타이머 저장 변수

  const increment = useRef<any>(null); // ref의 current에서 setInterval 호출하여 사용하기 위해 변수 생성, 컴포넌트가 재렌더링되지 않음

  const today = JSON.stringify(new Date()).split('T')[0].replace('"', ''); // 날짜 데이터를 문자열로 가공

  // timer에 저장한 시간 포멧팅 함수
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // 타이머 시작 함수
  const handleStart = () => {
    setTracking(!tracking);
    {
      tracking
        ? (increment.current = setInterval(() => {
            setTimer(timer => timer + 1);
          }, 1000))
        : clearInterval(increment.current);
    }
  };

  // 타이머 초기화 함수
  const handleReset = () => {
    clearInterval(increment.current);
    setTracking(false);
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
  const endTracking = useCallback(() => {
    return Alert.alert('등산 기록 종료', '등산 기록을 종료하시겠습니까?', [
      {
        text: '네',
        onPress: () => {
          moveToTrackingEnd(formatTime());
          handleReset();
        },
      },
      {
        text: '아니오',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
    ]);
  }, [tracking, timer]);

  // 페이지 첫 접속 시 타이머 바로 시작
  useEffect(() => {
    handleStart();
  }, []);

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
        <StopWatch formatTime={formatTime} />
      </View>
      <View style={styles.iconView}>
        <Text onPress={stopTracking} onLongPress={endTracking}>
          <FontAwesomeIcon icon={!tracking ? faStop : faPause} size={60} />
        </Text>
        <Text>길게 눌러 종료하기</Text>
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
  iconView: {
    alignItems: 'center',
    marginTop: 30,
  },
});

export default TrackingRoute;
