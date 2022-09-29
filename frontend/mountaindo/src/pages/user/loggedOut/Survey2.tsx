import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../../../AppInner';
import userSlice from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';

type Survey2ScreenProps = NativeStackScreenProps<LoggedInParamList, 'Survey2'>;

function Survey2({navigation}: Survey2ScreenProps) {
  const dispatch = useAppDispatch();
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked, setChecked] = useState(0);
  const canGoNext = isChecked1 || isChecked2;

  const setSurvey2 = () => {
    if (isChecked1) {
      dispatch(
        userSlice.actions.setSurvey({
          number: 2,
          visitedMountain: '없음',
        }),
      );
    } else if (isChecked2) {
      dispatch(
        userSlice.actions.setSurvey({
          number: 2,
          visitedMountain: '있음',
        }),
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>최근 방문했던 산</Text>
        <Text style={styles.subTitle}>최근 어떤 산을 방문했나요?</Text>
      </View>
      {isChecked === 0 ? (
        <View>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked1(!isChecked1);
              setChecked(1);
            }}>
            <Text style={styles.answerBoxText}>없음</Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.answerBoxText}>있음</Text>
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
            <Text style={styles.checkedBoxText}>없음</Text>
          </Pressable>
          <Pressable
            style={styles.answerBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.answerBoxText}>있음</Text>
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
            <Text style={styles.answerBoxText}>없음</Text>
          </Pressable>
          <Pressable
            style={styles.checkedBox}
            onPress={() => {
              setChecked2(!isChecked2);
              setChecked(2);
            }}>
            <Text style={styles.checkedBoxText}>있음</Text>
          </Pressable>
        </View>
      )}
      <Pressable
        style={canGoNext ? styles.arrowButtonActive : styles.arrowButton}
        disabled={!canGoNext}
        onPress={() => {
          setSurvey2();
          navigation.navigate('Survey3');
        }}>
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
  wrapper: {
    backgroundColor: 'white',
    height: '100%',
    padding: 20,
  },
  titleWrapper: {
    marginTop: 50,
    // marginLeft: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    color: '#272827',
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: 10,
    color: '#272827',
    fontWeight: 'bold',
  },
  answerBox: {
    padding: 20,
    marginHorizontal: 10,
    marginTop: 30,
    // color: 'black',
    backgroundColor: 'white',
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c5c5c5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerBoxText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  checkedBox: {
    padding: 20,
    marginHorizontal: 10,
    marginTop: 30,
    color: 'black',
    backgroundColor: '#57d696',
    height: 60,
    borderRadius: 30,
    borderWidth: 0,
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
    marginTop: 40,
    marginLeft: 250,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#c5c5c5',
    alignItems: 'flex-end',
  },
  arrowIcon: {
    color: 'white',
  },
  arrowButtonActive: {
    width: 50,
    height: 50,
    marginTop: 40,
    marginLeft: 250,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#57d696',
    alignItems: 'flex-end',
  },
  arrowIconActive: {
    color: 'white',
  },
});

export default Survey2;
