import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../../../AppInner';
import userSlice from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';

type Survey1ScreenProps = NativeStackScreenProps<LoggedInParamList, 'Survey1'>;

function Survey1({navigation}: Survey1ScreenProps) {
  const dispatch = useAppDispatch();
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked, setChecked] = useState(0);
  const canGoNext = isChecked1 || isChecked2 || isChecked3;

  const setSurvey1 = () => {
    if (isChecked1) {
      dispatch(
        userSlice.actions.setSurvey({
          number: 1,
          myLevel: '등린이',
        }),
      );
    } else if (isChecked2) {
      dispatch(
        userSlice.actions.setSurvey({
          number: 1,
          myLevel: '등소년',
        }),
      );
    } else if (isChecked3) {
      dispatch(
        userSlice.actions.setSurvey({
          number: 1,
          myLevel: '등른이',
        }),
      );
    }
  };

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>등산레벨</Text>
        <Text style={styles.subTitle}>
          내가 생각하는 나의 등산 레벨은 어느 정도인가요?
        </Text>
      </View>
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
      <Pressable
        style={canGoNext ? styles.arrowButtonActive : styles.arrowButton}
        disabled={!canGoNext}
        onPress={() => {
          setSurvey1();
          navigation.navigate('Survey2');
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

export default Survey1;
