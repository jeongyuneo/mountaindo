import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../AppInner';

type Survey3ScreenProps = NativeStackScreenProps<RootStackParamList, 'Survey3'>;

function Survey3({navigation}: Survey3ScreenProps) {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  const canGoNext = isChecked1 || isChecked2;

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>선호하는 등산 스타일 </Text>
        <Text style={styles.subTitle}>어떤 등산 스타일을 좋아하시나요?</Text>
      </View>
      <View>
        {isChecked1 ? (
          <Pressable
            style={styles.checkedBox}
            onPress={() => setChecked1(false)}>
            <Text style={styles.checkedBoxText}>험난한 산맥 정복하기</Text>
          </Pressable>
        ) : !isChecked2 ? (
          <Pressable style={styles.answerBox} onPress={() => setChecked1(true)}>
            <Text style={styles.answerBoxText}>험난한 산맥 정복하기</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.answerBox}>
            <Text style={styles.answerBoxText}>험난한 산맥 정복하기</Text>
          </Pressable>
        )}
        {isChecked2 ? (
          <Pressable
            style={styles.checkedBox}
            onPress={() => setChecked2(false)}>
            <Text style={styles.checkedBoxText}>무리 없는 등산하기</Text>
          </Pressable>
        ) : !isChecked1 ? (
          <Pressable style={styles.answerBox} onPress={() => setChecked2(true)}>
            <Text style={styles.answerBoxText}>무리 없는 등산하기</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.answerBox}>
            <Text style={styles.answerBoxText}>무리 없는 등산하기</Text>
          </Pressable>
        )}
      </View>
      <Pressable
        style={canGoNext ? styles.arrowButtonActive : styles.arrowButton}
        disabled={!canGoNext}
        onPress={() => navigation.navigate('Survey4')}>
        <FontAwesomeIcon
          icon={faArrowRight}
          size={30}
          style={canGoNext ? styles.arrowIconActive : styles.arrowIcon}
        />
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
    fontSize: 15,
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
    fontSize: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginLeft: 280,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'grey',
    alignItems: 'flex-end',
  },
  arrowIcon: {
    color: 'white',
  },
  arrowButtonActive: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginLeft: 280,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'flex-end',
  },
  arrowIconActive: {
    color: 'white',
  },
});

export default Survey3;
