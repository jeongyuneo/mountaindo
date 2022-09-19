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

// navigation을 사용하기 위해 type 설정
type FindPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FindPassword'
>;

function FindPassword({navigation}: FindPasswordScreenProps) {
  const [email, setEmail] = useState(''); // 사용자 이메일 저장할 변수
  const [code, setCode] = useState(''); // 이메일 인증번호 저장할 변수
  const [password1, setPassword1] = useState(''); // 비밀번호 저장할 변수
  const [password2, setPassword2] = useState(''); // 비밀번호 확인을 저장할 변수
  const [emailValid, setEmailValid] = useState(false); // 이메일 유효성 검사를 확인할 변수
  const [emailVerify, setEmailVerify] = useState(false); // 이메일 인증 확인을 위한 변수

  const emailRef = useRef<TextInput | null>(null); // 사용자 이메일 input의 값 가져오기
  const codeRef = useRef<TextInput | null>(null); // 이메일 인증번호 input의 값 가져오기
  const password1Ref = useRef<TextInput | null>(null); // 비밀번호 input의 값 가져오기
  const password2Ref = useRef<TextInput | null>(null); // 비밀번호 확인 input의 값 가져오기

  // 이메일 인증번호 input 변경 시 email에 저장
  const onChangeCode = useCallback((text: string) => {
    setCode(text.trim());
  }, []);

  // 비밀번호 input 변경 시 password1에 저장
  const onChangePassword1 = useCallback((text: string) => {
    setPassword1(text.trim());
  }, []);

  // 비밀번호 확인 input 변경 시 password2에 저장
  const onChangePassword2 = useCallback((text: string) => {
    setPassword2(text.trim());
  }, []);

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

  // 비밀번호 유효성 검사 함수
  const checkPassword = useCallback((text: string) => {
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(text)) {
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

  // 이메일 인증코드 전송 함수
  const sendCode = () => {
    if (emailValid) {
      setEmailVerify(true);
      return Alert.alert('알림', '인증번호를 전송했습니다.');
    }
    setEmailVerify(false);
    return Alert.alert('알림', '인증번호를 전송하지 못했습니다.');
  };

  // 비밀번호 찾기 버튼 클릭 시 유효성 검사
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!code || !code.trim()) {
      return Alert.alert('알림', '인증번호를 입력해주세요.');
    }
    if (!password1 || !password1.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!password2 || !password2.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (password1 !== password2) {
      return Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
    }
    if (!checkEmail(email)) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!emailVerify) {
      return Alert.alert('알림', '이메일 인증이 되지 않았습니다.');
    }
    if (!checkPassword(password1)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    return Alert.alert('알림', '비밀번호가 재설정되었습니다.');
  }, [
    email,
    code,
    password1,
    password2,
    checkEmail,
    emailVerify,
    checkPassword,
  ]);

  const canGoNext =
    email && code && password1 && password2 && emailValid && emailVerify; // 버튼 disabled 확인할 변수
  return (
    <DismissKeyboardView>
      <View style={styles.inputGroup}>
        <View style={styles.emailInputView}>
          <TextInput
            style={styles.emailInput}
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
            onSubmitEditing={() => codeRef.current?.focus()}
            blurOnSubmit={false}
          />
          <Pressable
            onPress={sendCode}
            style={
              emailValid
                ? StyleSheet.compose(styles.codeButton, styles.buttonActive)
                : styles.codeButton
            }
            disabled={!emailValid}>
            <Text style={styles.codeButtonText}>인증</Text>
          </Pressable>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeCode}
            placeholder="인증번호를 입력해주세요"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            textContentType="none"
            value={code}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={codeRef}
            onSubmitEditing={() => password1Ref.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword1}
            placeholder="새 비밀번호를 입력해주세요"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            autoComplete="password"
            textContentType="password"
            secureTextEntry
            value={password1}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={password1Ref}
            onSubmitEditing={() => password2Ref.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword2}
            placeholder="새 비밀번호를 다시 입력해주세요"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            autoComplete="password"
            textContentType="password"
            secureTextEntry
            value={password2}
            returnKeyType="send"
            clearButtonMode="while-editing"
            ref={password2Ref}
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
  emailInput: {
    borderBottomWidth: 1,
    width: 240,
    color: 'black',
  },
  emailInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
  },
  codeButtonText: {
    textAlign: 'center',
    color: 'white',
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
