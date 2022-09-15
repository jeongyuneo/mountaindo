import React, {useCallback, useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import DismissKeyboardView from '../components/DismissKeyboardView';

interface Props {
  navigation: any;
}

function SignUp({navigation}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const passwordCheckRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const nickNameRef = useRef<TextInput | null>(null);
  const phoneNumberRef = useRef<TextInput | null>(null);
  const birthDayRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onChangePasswordCheck = useCallback(text => {
    setPasswordCheck(text.trim());
  }, []);

  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);

  const onChangeNickName = useCallback(text => {
    setNickName(text.trim());
  }, []);

  const onChangePhoneNumber = useCallback(text => {
    setPhoneNumber(text.trim());
  }, []);

  const onChangeBirthDay = useCallback(text => {
    setBirthDay(text.trim());
  }, []);

  return (
    <DismissKeyboardView>
      <Text style={styles.title}>회원가입</Text>
      <View style={styles.emailInputWrapper}>
        <TextInput
          style={styles.emailInputText}
          onChangeText={onChangeEmail}
          placeholder="이메일"
          placeholderTextColor="#666"
          textContentType="emailAddress"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          // onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
        <Pressable style={styles.checkEmail}>
          <Text>인증</Text>
        </Pressable>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangePassword}
          placeholder="비밀번호"
          placeholderTextColor="#666"
          textContentType="password"
          value={password}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={passwordRef}
          // onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangePasswordCheck}
          placeholder="비밀번호 확인"
          placeholderTextColor="#666"
          textContentType="password"
          value={passwordCheck}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={passwordCheckRef}
          // onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeName}
          placeholder="이름"
          placeholderTextColor="#666"
          textContentType="name"
          value={name}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nameRef}
          // onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeNickName}
          placeholder="닉네임"
          placeholderTextColor="#666"
          textContentType="nickname"
          value={nickName}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nickNameRef}
          // onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangePhoneNumber}
          placeholder="핸드폰 번호 ex) 010-1234-5678"
          placeholderTextColor="#666"
          textContentType="telephoneNumber"
          value={phoneNumber}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={phoneNumberRef}
          // onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeBirthDay}
          placeholder="생년월일 ex) 2022-01-01"
          placeholderTextColor="#666"
          textContentType="none"
          value={birthDay}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={birthDayRef}
          // onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable style={styles.registerButton}>
          <Text
            style={styles.registerButtonText}
            onPress={() => navigation.navigate('Welcome')}>
            가입하기
          </Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  emailInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailInputText: {
    marginLeft: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 250,
  },
  checkEmail: {
    backgroundColor: 'grey',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    marginRight: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  inputText: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
    width: 310,
  },
  buttonZone: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: 'grey',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
  },
});

export default SignUp;
