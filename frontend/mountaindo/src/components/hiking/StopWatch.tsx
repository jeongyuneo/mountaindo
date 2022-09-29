import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppTextBold from '../AppTextBold';

// formatTime: TrackingRoute 컴포넌트에서 받아오는 시간 포맷팅 함수
const StopWatch = ({formatTime}: any) => {
  return (
    <View style={styles.container}>
      <AppTextBold style={styles.text}>{formatTime()}</AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 35,
  },
});

export default StopWatch;
