import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../../../AppInner';
import Survey1 from '../../../components/user/Survey1';

type SurveyScreenProps = NativeStackScreenProps<RootStackParamList, 'Survey'>;

function Survey({navigation}: SurveyScreenProps) {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked, setChecked] = useState(0);
  const canGoNext = isChecked1 || isChecked2 || isChecked3;

  useEffect(() => {}, [isChecked1, isChecked2, isChecked3]);

  return (
    <View>
      <Survey1
        isChecked1={isChecked1}
        isChecked2={isChecked2}
        isChecked3={isChecked3}
        setChecked1={setChecked1}
        setChecked2={setChecked2}
        setChecked3={setChecked3}
        isChecked={isChecked}
        setChecked={setChecked}
      />
      <Pressable
        style={canGoNext ? styles.arrowButtonActive : styles.arrowButton}
        disabled={!canGoNext}
        onPress={() => navigation.navigate('Survey2')}>
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

export default Survey;
