import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AgreementModal1 from '../components/AgreementModal1';
import AgreementModal2 from '../components/AgreementModal2';
import AgreementModal3 from '../components/AgreementModal3';

interface Props {
  navigation: any;
}

function Agreement({navigation}: Props) {
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
  const [visibleModal3, setVisibleModal3] = useState(false);

  return (
    <View>
      <View>
        <Text style={styles.title}>MountainDo</Text>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>마운틴두 이용약관 동의</Text>
          <Text style={styles.subTitleText}>
            서비스의 이용을 위하여 필수 약관 동의가 필요합니다.
          </Text>
        </View>
      </View>
      <View>
        <View>
          <Pressable
            style={styles.agreeList}
            onPress={() => setVisibleModal1(true)}>
            <Text style={styles.agreementText}>(필수) 서비스 이용약관</Text>
            <CheckBox
              disabled={false}
              value={isSelected1}
              onValueChange={newValue => setSelection1(newValue)}
            />
          </Pressable>
          {visibleModal1 && (
            <AgreementModal1
              setVisibleModal1={setVisibleModal1}
              visibleModal1={visibleModal1}
            />
          )}
        </View>
        <View>
          <Pressable
            style={styles.agreeList}
            onPress={() => setVisibleModal2(true)}>
            <Text style={styles.agreementText}>
              (필수) 개인정보 수집 및 목적
            </Text>
            <CheckBox
              disabled={false}
              value={isSelected2}
              onValueChange={newValue => setSelection2(newValue)}
            />
          </Pressable>
          {visibleModal2 && (
            <AgreementModal2
              setVisibleModal2={setVisibleModal2}
              visibleModal2={visibleModal2}
            />
          )}
        </View>
        <View>
          <Pressable
            style={styles.agreeList}
            onPress={() => setVisibleModal3(true)}>
            <Text style={styles.agreementText}>
              (필수) 위치기반 서비스 이용약관
            </Text>
            <CheckBox
              disabled={false}
              value={isSelected3}
              onValueChange={newValue => setSelection3(newValue)}
            />
          </Pressable>
          {visibleModal3 && (
            <AgreementModal3
              setVisibleModal3={setVisibleModal3}
              visibleModal3={visibleModal3}
            />
          )}
        </View>
        <View style={styles.line}>
          <View style={styles.innerLine} />
        </View>
      </View>
      <View style={styles.agreeAll}>
        <CheckBox disabled={false} />
        <Text style={styles.agreeAllText}>모두 동의합니다.</Text>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={styles.startButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.startButtonText}>시작하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle: {
    marginLeft: 20,
    marginBottom: 40,
    color: 'black',
  },
  subTitleText: {
    color: 'black',
  },
  agreeList: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  agreementText: {
    marginRight: 20,
    color: 'black',
  },
  line: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  agreeAll: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  agreeAllText: {
    marginTop: 7,
  },
  buttonZone: {
    marginTop: 10,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: 'grey',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 10,
  },
  startButtonText: {
    color: 'white',
  },
});

export default Agreement;
