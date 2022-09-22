import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../../AppInner';

type Survey1ScreenProps = NativeStackScreenProps<RootStackParamList, 'Survey5'>;

function Survey3({navigation}: Survey1ScreenProps) {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked, setChecked] = useState(0);
  const canGoNext = isChecked1 || isChecked2;

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>선호하는 산 종류</Text>
        <Text style={styles.subTitle}>어떤 산의 지형을 좋아하시나요?</Text>
      </View>
      {isChecked === 0 ? (
        <View>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked1(!isChecked1);
              setChecked(1);
            }}>
            <Text style={styles.answerBoxText}>돌산</Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.answerBoxText}>흙산</Text>
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
            <Text style={styles.checkedBoxText}>돌산</Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.answerBoxText}>흙산</Text>
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
            <Text style={styles.answerBoxText}>돌산</Text>
          </Pressable>
          <Pressable
            style={styles.checkedBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.checkedBoxText}>흙산</Text>
          </Pressable>
        </View>
      )}
      <Pressable
        style={canGoNext ? styles.arrowButtonActive : styles.arrowButton}
        disabled={!canGoNext}
        onPress={() => navigation.navigate('Survey5')}>
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
