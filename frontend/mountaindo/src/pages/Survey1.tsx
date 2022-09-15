import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

function Survey1() {
  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>등산레벨</Text>
        <Text style={styles.subTitle}>
          내가 생각하는 나의 등산 레벨은 어느 정도인가요?
        </Text>
      </View>
      <View>
        <Pressable style={styles.answerBox1}>
          <Text>등른이 - 등산이면 가파르고 높아야죠!</Text>
        </Pressable>
        <Pressable>
          <Text>등른이 - 등산이면 가파르고 높아야죠!</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    marginTop: 50,
    marginLeft: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  answerBox1: {
    marginTop: 20,
  },
});

export default Survey1;
