import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  isChecked1: boolean;
  isChecked2: boolean;
  isChecked3: boolean;
  isChecked: number;
  setChecked1: any;
  setChecked2: any;
  setChecked3: any;
  setChecked: any;
};

function Survey1(props: Props) {
  const {
    isChecked1,
    isChecked2,
    isChecked3,
    isChecked,
    setChecked1,
    setChecked2,
    setChecked3,
    setChecked,
  } = props;

  console.log(isChecked);

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>등산레벨</Text>
        <Text style={styles.subTitle}>
          내가 생각하는 나의 등산 레벨은 어느 정도인가요?
        </Text>
      </View>
      {/* <View> */}
      {isChecked === 0 ? (
        <View>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked1(!isChecked1);
              setChecked(1);
            }}>
            <Text style={styles.answerBoxText}>
              등린이 - 낮고 완만한 산이 좋아요!
            </Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.answerBoxText}>
              등소년 - 등산이면 적당한 운동이 좋아요!
            </Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked3(!isChecked3);
              setChecked(3);
            }}>
            <Text style={styles.answerBoxText}>
              등른이 - 등산이면 가파르고 높아야죠!
            </Text>
          </Pressable>
        </View>
      ) : isChecked === 1 ? (
        <View>
          <Pressable
            style={styles.checkedBox}
            onPress={() => {
              setChecked1(!isChecked1);
              setChecked(1);
            }}>
            <Text style={styles.checkedBoxText}>
              등린이 - 낮고 완만한 산이 좋아요!
            </Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.answerBoxText}>
              등소년 - 등산이면 적당한 운동이 좋아요!
            </Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked3(!isChecked3);
              setChecked(3);
            }}>
            <Text style={styles.answerBoxText}>
              등른이 - 등산이면 가파르고 높아야죠!
            </Text>
          </Pressable>
        </View>
      ) : isChecked === 2 ? (
        <View>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked1(!isChecked1);
              setChecked(1);
            }}>
            <Text style={styles.answerBoxText}>
              등린이 - 낮고 완만한 산이 좋아요!
            </Text>
          </Pressable>
          <Pressable
            style={styles.checkedBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.checkedBoxText}>
              등소년 - 등산이면 적당한 운동이 좋아요!
            </Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked3(!isChecked3);
              setChecked(3);
            }}>
            <Text style={styles.answerBoxText}>
              등른이 - 등산이면 가파르고 높아야죠!
            </Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked1(!isChecked1);
              setChecked(1);
            }}>
            <Text style={styles.answerBoxText}>
              등린이 - 낮고 완만한 산이 좋아요!
            </Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.answerBoxText}>
              등소년 - 등산이면 적당한 운동이 좋아요!
            </Text>
          </Pressable>
          <Pressable
            style={styles.checkedBox}
            onPress={() => {
              setChecked3(!isChecked3);
              setChecked(3);
            }}>
            <Text style={styles.checkedBoxText}>
              등른이 - 등산이면 가파르고 높아야죠!
            </Text>
          </Pressable>
        </View>
      )}
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
});

export default Survey1;
