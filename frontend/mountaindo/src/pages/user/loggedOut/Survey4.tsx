import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {LoggedInParamList} from '../../../../AppInner';
import AppTextBold from '../../../components/AppTextBold';
import userSlice, {survey} from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';
import {RootState} from '../../../store/reducer';

type Survey4ScreenProps = NativeStackScreenProps<LoggedInParamList, 'Survey4'>;

function Survey4({navigation}: Survey4ScreenProps) {
  const dispatch = useAppDispatch();
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked, setChecked] = useState(0);
  const canGoNext = isChecked1 || isChecked2 || isChecked3 || isChecked4;

  const survey1 = useSelector((state: RootState) => state.user.survey1);
  const survey2 = useSelector((state: RootState) => state.user.survey2);
  const survey3 = useSelector((state: RootState) => state.user.survey3);
  let survey4 = 0;

  const setSurvey4 = () => {
    if (isChecked1) {
      survey4 = 1;
    } else if (isChecked2) {
      survey4 = 2;
    } else if (isChecked3) {
      survey4 = 3;
    } else if (isChecked4) {
      survey4 = 4;
    }
    setSurvey();
  };

  const setSurvey = () => {
    dispatch(survey({survey1, survey2, survey3, survey4}))
      .then(res => {
        console.log(res);
        dispatch(userSlice.actions.setIsSurveyed(''));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <AppTextBold style={styles.title}>선호하는 등산 소요시간</AppTextBold>
        <AppTextBold style={styles.subTitle}>
          등산하는데 어느 정도의 시간을 소요하시나요?
        </AppTextBold>
      </View>
      <View>
        <Pressable
          style={
            isChecked === 0
              ? styles.answerBox
              : isChecked === 1
              ? styles.checkedBox
              : isChecked === 2
              ? styles.answerBox
              : isChecked === 3
              ? styles.answerBox
              : styles.answerBox
          }
          onPress={() => {
            setChecked1(!isChecked1);
            setChecked(1);
          }}>
          <AppTextBold
            style={
              isChecked === 0
                ? styles.answerBoxText
                : isChecked === 1
                ? styles.checkedBoxText
                : isChecked === 2
                ? styles.answerBoxText
                : isChecked === 3
                ? styles.answerBoxText
                : styles.answerBoxText
            }>
            3시간 이내
          </AppTextBold>
        </Pressable>
        <Pressable
          style={
            isChecked === 0
              ? styles.answerBox
              : isChecked === 1
              ? styles.answerBox
              : isChecked === 2
              ? styles.checkedBox
              : isChecked === 3
              ? styles.answerBox
              : styles.answerBox
          }
          onPress={() => {
            setChecked2(!isChecked2);
            setChecked(2);
          }}>
          <AppTextBold
            style={
              isChecked === 0
                ? styles.answerBoxText
                : isChecked === 1
                ? styles.answerBoxText
                : isChecked === 2
                ? styles.checkedBoxText
                : isChecked === 3
                ? styles.answerBoxText
                : styles.answerBoxText
            }>
            3시간 이상 5시간 이내
          </AppTextBold>
        </Pressable>
        <Pressable
          style={
            isChecked === 0
              ? styles.answerBox
              : isChecked === 1
              ? styles.answerBox
              : isChecked === 2
              ? styles.answerBox
              : isChecked === 3
              ? styles.checkedBox
              : styles.answerBox
          }
          onPress={() => {
            setChecked3(!isChecked3);
            setChecked(3);
          }}>
          <AppTextBold
            style={
              isChecked === 0
                ? styles.answerBoxText
                : isChecked === 1
                ? styles.answerBoxText
                : isChecked === 2
                ? styles.answerBoxText
                : isChecked === 3
                ? styles.checkedBoxText
                : styles.answerBoxText
            }>
            5시간 이상 7시간 이내
          </AppTextBold>
        </Pressable>
        <Pressable
          style={
            isChecked === 0
              ? styles.answerBox
              : isChecked === 1
              ? styles.answerBox
              : isChecked === 2
              ? styles.answerBox
              : isChecked === 3
              ? styles.answerBox
              : styles.checkedBox
          }
          onPress={() => {
            setChecked4(!isChecked4);
            setChecked(4);
          }}>
          <AppTextBold
            style={
              isChecked === 0
                ? styles.answerBoxText
                : isChecked === 1
                ? styles.answerBoxText
                : isChecked === 2
                ? styles.answerBoxText
                : isChecked === 3
                ? styles.answerBoxText
                : styles.checkedBoxText
            }>
            7시간 이상 10시간 이내
          </AppTextBold>
        </Pressable>
      </View>
      <Pressable
        style={canGoNext ? styles.arrowButtonActive : styles.arrowButton}
        disabled={!canGoNext}
        onPress={() => {
          setSurvey4();
          navigation.navigate('Survey4');
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
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    color: '#272827',
  },
  subTitle: {
    marginVertical: 10,
    color: '#272827',
  },
  answerBox: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'white',
    height: 55,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c5c5c5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerBoxText: {
    color: 'grey',
  },
  checkedBox: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#57d696',
    height: 55,
    borderRadius: 30,
    borderWidth: 0,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBoxText: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    width: 50,
    height: 50,
    marginTop: 15,
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
    marginTop: 15,
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

export default Survey4;
