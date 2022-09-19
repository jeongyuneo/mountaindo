import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../AppInner';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

function Welcome({navigation}: WelcomeScreenProps) {
  return (
    <View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>가입을 축하합니다.</Text>
        <Text style={styles.subTitle}>
          간단한 설문 조사를 통해 등산 코스를 추천해드려요!
        </Text>
        <Text style={styles.title}>설문조사 하러가기</Text>

        <Pressable
          style={styles.arrowButton}
          onPress={() => navigation.navigate('Survey')}>
          <FontAwesomeIcon
            icon={faArrowRight}
            size={30}
            style={styles.arrowIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    alignItems: 'center',
    marginTop: 180,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: 10,
    marginBottom: 30,
    color: 'black',
    fontSize: 15,
  },
  arrowButton: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 50,
    marginTop: 80,
    backgroundColor: 'black',
  },
  arrowIcon: {
    color: 'white',
  },
});

export default Welcome;
