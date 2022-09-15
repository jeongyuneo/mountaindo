import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {RootStackParamList} from '../../AppInner';
import DatePicker from '../component/DatePicker';
import DismissKeyboardView from '../component/DismissKeyboardView';

// navigation을 사용하기 위해 type 설정
type FindIdScreenProps = NativeStackScreenProps<RootStackParamList, 'FindId'>;

function FindId({navigation}: FindIdScreenProps) {
  const [name, setName] = useState(''); // 사용자 이름 저장할 변수
  const [check, setCheck] = useState(0); // 달력에 날짜를 선택했는지 확인할 변수
  const [phoneNumber, setPhoneNumber] = useState(''); // 사용자 휴대폰번호를 저장할 변수
  const [visibleId, setVisibleId] = useState(false); // 아이디 찾기에 성공했을 경우 화면 변경할 변수 ex) true면 아이디, false면 아이디 찾기 화면

  const nameRef = useRef<TextInput | null>(null); // 사용자 이름 input의 값 가져오기
  const phoneNumberRef = useRef<TextInput | null>(null); // 사용자 휴대폰번호 input의 값 가져오기

  // 사용자 이름 input값 변경 시 name 변수에 값 변경
  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);

  // 사용자 휴대폰번호 input값 변경 시 phoneNumber 변수에 값 변경
  const onChangPhoneNumber = useCallback((text: string) => {
    setPhoneNumber(text.trim());
  }, []);

  // 아아디 찾기 버튼을 눌렀을 때 유효성 검사
  const onSubmit = useCallback(async () => {
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!check) {
      return Alert.alert('알림', '생년월일을 입력해주세요.');
    }
    if (!phoneNumber || !phoneNumber.trim()) {
      return Alert.alert('알림', '휴대폰 번호를 입력해주세요.');
    }
    if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/.test(phoneNumber)) {
      return Alert.alert(
        '알림',
        '숫자, -을 포함해 휴대전화 형식에 맞게 입력해주세요.',
      );
    }
    setVisibleId(true);
  }, [name, phoneNumber, check]);

  const canGoNext = name && phoneNumber && !!check; // 버튼 disabled 확인할 변수
  return (
    <DismissKeyboardView>
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={30}
            style={styles.backIcon}
          />
        </Pressable>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>아이디 찾기</Text>
      </View>
      {visibleId ? (
        <View>
          <View style={styles.findIdView}>
            <Text style={styles.findIdText}>아이디 찾기 성공</Text>
          </View>
          <View style={styles.toLoginButton}>
            <Pressable onPress={() => navigation.navigate('SignIn')}>
              <Text>로그인</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.inputGroup}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              placeholder="이름 입력해주세요"
              placeholderTextColor="#666"
              importantForAutofill="yes"
              autoComplete="name"
              textContentType="name"
              value={name}
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={nameRef}
              blurOnSubmit={false}
            />
          </View>
          <View>
            <DatePicker setCheck={setCheck} />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={onChangPhoneNumber}
              placeholder="휴대폰 번호를 입력해주세요 ex) 010-1234-5678"
              placeholderTextColor="#666"
              importantForAutofill="yes"
              autoComplete="tel"
              textContentType="telephoneNumber"
              value={phoneNumber}
              returnKeyType="send"
              clearButtonMode="while-editing"
              ref={phoneNumberRef}
              onSubmitEditing={onSubmit}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.findPasswordButton}>
            <Pressable onPress={() => navigation.push('FindPassword')}>
              <Text>비밀번호 찾기</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              disabled={!canGoNext}
              onPress={onSubmit}
              style={
                canGoNext
                  ? StyleSheet.compose(
                      styles.findIdButton,
                      styles.findIdButtonActive,
                    )
                  : styles.findIdButton
              }>
              <Text style={styles.buttonText}>아이디 찾기</Text>
            </Pressable>
          </View>
        </View>
      )}
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  titleView: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  findIdView: {
    backgroundColor: '#dadada',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  findIdText: {
    textAlign: 'center',
  },
  toLoginButton: {
    alignItems: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputGroup: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputView: {
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    color: 'black',
  },
  findPasswordButton: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  findIdButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  findIdButtonActive: {
    backgroundColor: 'blue',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default FindId;
