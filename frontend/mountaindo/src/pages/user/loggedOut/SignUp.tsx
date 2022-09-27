import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../../../../AppInner';
import DismissKeyboardView from '../../../components/DismissKeyboardView';
import DatePicker from '../../../components/user/DatePicker';
import LocationPicker from '../../../components/user/LocationPicker';
import {checkCertification, signUp} from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(0); // 이메일 중복확인 여부. 사용 가능 : 1, 사용 불가능 : 0
  const [certification, setCertification] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCity2, setSelectedCity2] = useState('');
  const [check, setCheck] = useState(0); // 달력에 날짜를 선택했는지 확인할 변수
  const emailRef = useRef<TextInput | null>(null);
  const certificationRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const passwordCheckRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const nickNameRef = useRef<TextInput | null>(null);
  const phoneNumberRef = useRef<TextInput | null>(null);
  const canGoNext =
    email &&
    checkEmail &&
    certification &&
    password &&
    passwordCheck &&
    name &&
    nickName &&
    phoneNumber &&
    !!check &&
    selectedCity &&
    selectedCity2;

  const disabledEmail =
    !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
      email,
    );

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);

  const onChangeCertification = useCallback(text => {
    setCertification(text.trim());
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

  const pressCertificationButton = useCallback(() => {
    if (disabledEmail) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    dispatch(checkCertification({email}))
      .then(res => {
        console.log('CHECK CERTIFICATION RES ==>', res);
        if (res.meta.requestStatus === 'fulfilled') {
          setCheckEmail(1);
          Alert.alert('알림', '사용할 수 있는 이메일입니다.');
        } else if (res.meta.requestStatus === 'rejected') {
          setCheckEmail(0);
          Alert.alert('알림', '중복된 이메일이 있습니다.');
        }
      })
      .catch(err => {
        console.log('CHECK CERTIFICATION ERR ==>', err);
      });
  }, [disabledEmail, dispatch, email]);

  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입해주세요.');
    }
    if (!checkEmail) {
      return Alert.alert('알림', '중복된 이메일이 있습니다.');
    }
    if (!certification || !certification.trim()) {
      return Alert.alert('알림', '인증번호를 입해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!passwordCheck || !passwordCheck.trim()) {
      return Alert.alert('알림', '비밀번호를 재입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!nickName || !nickName.trim()) {
      return Alert.alert('알림', '닉네임을 입력해주세요.');
    }
    if (!phoneNumber || !phoneNumber.trim()) {
      return Alert.alert('알림', '핸드폰 번호를 입력해주세요.');
    }
    if (!selectedCity || !selectedCity2) {
      return Alert.alert('알림', '주소를 입력해주세요.');
    }
    if (!check) {
      return Alert.alert('알림', '생년월일을 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    if (!passwordCheck) {
      return Alert.alert('알림', '비밀번호를 재입력해주세요.');
    } else {
      if (password !== passwordCheck) {
        return Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
      }
    }
    if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/.test(phoneNumber)) {
      return Alert.alert(
        '알림',
        '숫자, -을 포함해 휴대전화 형식에 맞게 입력해주세요.',
      );
    }
    dispatch(
      signUp({
        email,
        password,
        name,
        check,
        phoneNumber,
        selectedCity,
        selectedCity2,
        nickName,
      }),
    )
      .then(res => {
        console.log('LOGIN RES ===> ', res);
      })
      .catch(err => {
        console.log('LOGIN ERR ===> ', err);
      });
    Alert.alert('알림', '회원가입되었습니다.');
    navigation.navigate('Welcome');
  }, [
    email,
    checkEmail,
    certification,
    password,
    passwordCheck,
    name,
    nickName,
    phoneNumber,
    check,
    dispatch,
    selectedCity,
    selectedCity2,
    navigation,
  ]);

  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNumber.length === 13) {
      setPhoneNumber(
        phoneNumber
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [phoneNumber]);

  return (
    <DismissKeyboardView>
      <Text style={styles.title}>회원가입</Text>
      <View style={styles.emailInputWrapper}>
        <TextInput
          style={styles.emailInputText}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요."
          placeholderTextColor="#666"
          textContentType="emailAddress"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          onSubmitEditing={() => certificationRef.current?.focus()}
          blurOnSubmit={false}
        />
        <Pressable
          style={!disabledEmail ? styles.checkEmailActive : styles.checkEmail}
          onPress={pressCertificationButton}>
          <Text style={styles.checkEmailText}>인증</Text>
        </Pressable>
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeCertification}
            placeholder="인증번호를 입력해주세요."
            placeholderTextColor="#666"
            textContentType="none"
            value={certification}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={certificationRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangePassword}
            placeholder="비밀번호를 입력해주세요(영문, 숫자, 특수문자)"
            placeholderTextColor="#666"
            textContentType="password"
            value={password}
            secureTextEntry
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={passwordRef}
            onSubmitEditing={() => passwordCheckRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangePasswordCheck}
            placeholder="비밀번호를 재입력해주세요."
            placeholderTextColor="#666"
            textContentType="none"
            value={passwordCheck}
            secureTextEntry
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={passwordCheckRef}
            onSubmitEditing={() => nameRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeName}
            placeholder="이름을 입력해주세요."
            placeholderTextColor="#666"
            textContentType="name"
            value={name}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={nameRef}
            onSubmitEditing={() => nickNameRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeNickName}
            placeholder="닉네임을 입력해주세요."
            placeholderTextColor="#666"
            importantForAutofill="yes"
            textContentType="nickname"
            value={nickName}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={nickNameRef}
            onSubmitEditing={() => phoneNumberRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangePhoneNumber}
            placeholder="핸드폰 번호를 입력해주세요. ex) 010-1234-5678"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            textContentType="telephoneNumber"
            value={phoneNumber}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={phoneNumberRef}
            blurOnSubmit={false}
          />
        </View>
        <DatePicker setCheck={setCheck} />
        <View style={styles.location}>
          <Text>실 거주지의 주소를 선택해주세요</Text>
          <LocationPicker
            setSelectedCity={setSelectedCity}
            setSelectedCity2={setSelectedCity2}
          />
        </View>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext ? styles.registerButtonActive : styles.registerButton
          }
          disabled={!canGoNext}>
          <Text style={styles.registerButtonText} onPress={onSubmit}>
            가입하기
          </Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
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
    borderBottomWidth: 1,
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
  checkEmailActive: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    marginRight: 20,
  },
  checkEmailText: {
    color: 'white',
  },
  inputGroup: {
    marginHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 320,
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
    marginTop: 5,
  },
  registerButtonActive: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
  },
  location: {
    marginVertical: 20,
  },
});

export default SignUp;
