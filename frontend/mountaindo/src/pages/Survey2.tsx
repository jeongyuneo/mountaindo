import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../AppInner';

type Survey2ScreenProps = NativeStackScreenProps<RootStackParamList, 'Survey2'>;

function Survey2({navigation}: Survey2ScreenProps) {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>등산지역 선호도 </Text>
        <Text style={styles.subTitle}>등산은 주로 어디에서 하시나요?</Text>
      </View>
      <View>
        {isChecked1 ? (
          <Pressable
            style={styles.checkedBox}
            onPress={() => setChecked1(false)}>
            <Text style={styles.checkedBoxText}>
              전국 - 명산이면 어디든! 등산을 위해 여행을 가요!
            </Text>
          </Pressable>
        ) : !isChecked2 ? (
          <Pressable style={styles.answerBox} onPress={() => setChecked1(true)}>
            <Text style={styles.answerBoxText}>
              전국 - 명산이면 어디든! 등산을 위해 여행을 가요!
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.answerBox}>
            <Text style={styles.answerBoxText}>
              전국 - 명산이면 어디든! 등산을 위해 여행을 가요!
            </Text>
          </Pressable>
        )}
        {isChecked2 ? (
          <Pressable
            style={styles.checkedBox}
            onPress={() => setChecked2(false)}>
            <Text style={styles.checkedBoxText}>
              지역 - 저의 주변을 주로 선호해요!
            </Text>
          </Pressable>
        ) : !isChecked1 ? (
          <Pressable style={styles.answerBox} onPress={() => setChecked2(true)}>
            <Text style={styles.answerBoxText}>
              지역 - 저의 주변을 주로 선호해요!
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.answerBox}>
            <Text style={styles.answerBoxText}>
              지역 - 저의 주변을 주로 선호해요!
            </Text>
          </Pressable>
        )}
      </View>
      <Pressable
        style={styles.nextButton}
        onPress={() => navigation.navigate('Survey3')}>
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
    fontSize: 13,
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
    fontSize: 13,
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

export default Survey2;
