import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../AppInner';

type Survey1ScreenProps = NativeStackScreenProps<RootStackParamList, 'Survey1'>;

function Survey1({navigation}: Survey1ScreenProps) {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>등산레벨</Text>
        <Text style={styles.subTitle}>
          내가 생각하는 나의 등산 레벨은 어느 정도인가요?
        </Text>
      </View>
      <View>
        {isChecked1 ? (
          <Pressable
            style={styles.checkedBox}
            onPress={() => setChecked1(false)}>
            <Text style={styles.checkedBoxText}>
              등린이 - 낮고 완만한 산이 좋아요!
            </Text>
          </Pressable>
        ) : !isChecked2 && !isChecked3 ? (
          <Pressable style={styles.answerBox} onPress={() => setChecked1(true)}>
            <Text style={styles.answerBoxText}>
              등린이 - 낮고 완만한 산이 좋아요!
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.answerBox}>
            <Text style={styles.answerBoxText}>
              등린이 - 낮고 완만한 산이 좋아요!
            </Text>
          </Pressable>
        )}
        {isChecked2 ? (
          <Pressable
            style={styles.checkedBox}
            onPress={() => setChecked2(false)}>
            <Text style={styles.checkedBoxText}>
              등소년 - 등산이면 적당한 운동이 좋아요!
            </Text>
          </Pressable>
        ) : !isChecked1 && !isChecked3 ? (
          <Pressable style={styles.answerBox} onPress={() => setChecked2(true)}>
            <Text style={styles.answerBoxText}>
              등소년 - 등산이면 적당한 운동이 좋아요!
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.answerBox}>
            <Text style={styles.answerBoxText}>
              등소년 - 등산이면 적당한 운동이 좋아요!
            </Text>
          </Pressable>
        )}
        {isChecked3 ? (
          <Pressable
            style={styles.checkedBox}
            onPress={() => setChecked3(false)}>
            <Text style={styles.checkedBoxText}>
              등른이 - 등산이면 가파르고 높아야죠!
            </Text>
          </Pressable>
        ) : !isChecked1 && !isChecked2 ? (
          <Pressable style={styles.answerBox} onPress={() => setChecked3(true)}>
            <Text style={styles.answerBoxText}>
              등른이 - 등산이면 가파르고 높아야죠!
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.answerBox}>
            <Text style={styles.answerBoxText}>
              등른이 - 등산이면 가파르고 높아야죠!
            </Text>
          </Pressable>
        )}
      </View>
      <Pressable
        style={styles.nextButton}
        onPress={() => navigation.navigate('Survey2')}>
        <Text>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 30,
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
  answerBox: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 30,
    color: 'black',
    backgroundColor: 'white',
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerBoxText: {
    color: 'black',
    fontWeight: 'bold',
  },
  checkedBox: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 30,
    color: 'black',
    backgroundColor: 'grey',
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBoxText: {
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    marginTop: 50,
    marginRight: 20,
    alignItems: 'flex-end',
  },
});

export default Survey1;
