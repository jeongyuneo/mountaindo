import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AgreementModal1 from '../components/AgreementModal1';
import AgreementModal2 from '../components/AgreementModal2';
import AgreementModal3 from '../components/AgreementModal3';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

type AgreementScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Agreement'
>;

function Agreement({navigation}: AgreementScreenProps) {
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [isSelectedAll, setSelectionAll] = useState(false);

  const checkBox = [{id: 0}, {id: 1}, {id: 2}];
  const [checkItems, setCheckItems] = useState<number[]>([]); // 체크된 아이템을 담을 배열
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
  const [visibleModal3, setVisibleModal3] = useState(false);

  const canGoNext = isSelected1 && isSelected2 && isSelected3 && isSelectedAll;

  // 체크박스 단일 선택
  const singleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
      if (id === 0) {
        setSelection1(checked);
      } else if (id === 1) {
        setSelection2(checked);
      } else {
        setSelection3(checked);
      }
      if (checkItems.length === 2) {
        setSelectionAll(checked);
      }
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
      if (id === 0) {
        setSelection1(checked);
      } else if (id === 1) {
        setSelection2(checked);
      } else {
        setSelection3(checked);
      }
      if (checkItems.length < 4) {
        setSelectionAll(checked);
      }
    }
  };

  // 체크박스 전체 선택
  const allCheck = (checked: boolean) => {
    if (checked) {
      const idArray: number[] | ((prevState: never[]) => never[]) = [];
      checkBox.forEach(el => idArray.push(el.id));
      setCheckItems(idArray);
      setSelection1(checked);
      setSelection2(checked);
      setSelection3(checked);
      setSelectionAll(checked);
    } else {
      setCheckItems([]);
      setSelection1(checked);
      setSelection2(checked);
      setSelection3(checked);
      setSelectionAll(checked);
    }
  };

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
              onValueChange={checked => singleCheck(checked, 0)}
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
              onValueChange={checked => singleCheck(checked, 1)}
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
              onValueChange={checked => singleCheck(checked, 2)}
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
        <CheckBox
          disabled={false}
          value={isSelectedAll}
          onValueChange={checked => allCheck(checked)}
        />
        <Text style={styles.agreeAllText}>모두 동의합니다.</Text>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={canGoNext ? styles.startButtonActive : styles.startButton}
          disabled={!canGoNext}
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
  startButtonActive: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 10,
  },
});

export default Agreement;
