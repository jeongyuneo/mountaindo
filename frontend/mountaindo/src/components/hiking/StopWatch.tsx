import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// formatTime: TrackingRoute 컴포넌트에서 받아오는 시간 포맷팅 함수
const StopWatch = ({formatTime}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 44,
  },
});

export default StopWatch;
