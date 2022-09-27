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
import {RootStackParamList} from '../../../../AppInner';
import DismissKeyboardView from '../../../components/DismissKeyboardView';
import {findPassword} from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';

// navigation을 사용하기 위해 type 설정
type FindPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FindPassword'
>;

function FindPassword({navigation}: FindPasswordScreenProps) {
  const [email, setEmail] = useState(''); // 사용자 이메일 저장할 변수
  const [name, setName] = useState(''); // 사용자 이름 저장할 변수
  const [emailValid, setEmailValid] = useState(false); // 이메일 유효성 검사를 확인할 변수

  const emailRef = useRef<TextInput | null>(null); // 사용자 이메일 input의 값 가져오기
  const nameRef = useRef<TextInput | null>(null); // 사용자 이름 input의 값 가져오기

  const dispatch = useAppDispatch();

  // 이메일 유효성 검사 함수
  const checkEmail = useCallback((text: string) => {
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        text,
      )
    ) {
      return false;
    }
    return true;
  }, []);

  // 이메일 input 변경 시 email에 저장 및 유효성 검사
  const onChangeEmail = useCallback(
    (text: string) => {
      setEmail(text.trim());
      if (checkEmail(text.trim())) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    },
    [checkEmail],
  );

  // 이름 input 변경 시 email에 저장 및 유효성 검사
  const onChangeName = useCallback(
    (text: string) => {
      setName(text.trim());
    },
    [name],
  );

  // 비밀번호 재설정 버튼 클릭 시 유효성 검사
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!checkEmail(email)) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    // 비밀번호 찾기 요청
    dispatch(findPassword({email, name}))
      .then(res => {
        // 이메일 연결 후 수정
        Alert.alert(
          '비밀번호 재설정',
          `비밀번호 재설정을 요청했습니다. \n메일을 확인해주세요!`,
        );
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          '비밀번호 재설정',
          '비밀번호 재설정에 실패했습니다. 다시 시도해주세요',
        );
      });
  }, [email, name, checkEmail, emailValid]);

  const canGoNext = email && name && emailValid; // 버튼 disabled 확인할 변수
  return (
    <DismissKeyboardView>
      <View style={styles.inputGroup}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            autoComplete="email"
            textContentType="emailAddress"
            value={email}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={emailRef}
            onSubmitEditing={() => nameRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            placeholder="이름을 입력해주세요"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            textContentType="name"
            value={name}
            returnKeyType="send"
            clearButtonMode="while-editing"
            ref={nameRef}
            onSubmitEditing={onSubmit}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.findIdButton}>
          <Pressable onPress={() => navigation.push('FindId')}>
            <Text>아이디 찾기</Text>
          </Pressable>
        </View>
        <View style={styles.findIdButton}>
          <Pressable onPress={() => navigation.push('SignIn')}>
            <Text>로그인</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            disabled={!canGoNext}
            onPress={onSubmit}
            style={
              canGoNext
                ? StyleSheet.compose(
                    styles.findPasswordButton,
                    styles.buttonActive,
                  )
                : styles.findPasswordButton
            }>
            <Text style={styles.buttonText}>비밀번호 재설정</Text>
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  inputView: {
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    color: 'black',
  },
  findIdButton: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  findPasswordButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonActive: {
    backgroundColor: 'blue',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default FindPassword;
