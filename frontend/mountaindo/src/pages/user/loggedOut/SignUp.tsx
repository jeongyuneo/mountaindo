import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import DismissKeyboardView from '../../../components/DismissKeyboardView';
import DatePicker from '../../../components/user/DatePicker';
import LocationPicker from '../../../components/user/LocationPicker';
import {
  checkCertification,
  checkNickname,
  emailAuth,
  emailRequest,
  login,
  signUp,
} from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppTextBold from '../../../components/AppTextBold';
import AppText from '../../../components/AppText';

function SignUp() {
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
  const [selectedDate, setSelectedDate] = useState(''); // 선택 날짜를 문자열 형태로 변경하여 저장할 변수
  const [disabledEmail, setDisableEmail] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  const [isNickname, setIsNickname] = useState(false);

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
    disabledEmail &&
    isCertificate &&
    isNickname;

  // 이메일 유효성 검사 함수
  const checkEmailValidation = useCallback((text: string) => {
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        text,
      )
    ) {
      return false;
    }
    return true;
  }, []);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
    if (checkEmailValidation(text.trim())) {
      setDisableEmail(true);
    } else {
      setDisableEmail(false);
    }
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
    if (!checkEmailValidation(email)) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    dispatch(checkCertification({email}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setCheckEmail(1);
          setIsCertificate(false);
          return Alert.alert(
            '알림',
            `사용할 수 있는 이메일입니다.\n 인증 버튼을 눌러주세요`,
          );
        }
        setCheckEmail(0);
        return Alert.alert('알림', '중복된 이메일이 있습니다.');
      })
      .catch(err => {
        Alert.alert('알림', err.message);
      });
  }, [disabledEmail, dispatch, email]);

  const [authmail, setAuthmail] = useState(false);
  // 이메일 인증
  const rsquestEmail = () => {
    dispatch(emailRequest({email}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setAuthmail(true);
          return Alert.alert(
            '이메일 요청',
            `해당 이메일에서\n인증번호를 확인하세요!`,
          );
        }
        setAuthmail(false);
        return Alert.alert(
          '이메일 요청',
          `이메일 전송에 실패했습니다.\n다시 시도해주세요!`,
        );
      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          '이메일 요청',
          `이메일 전송에 실패했습니다.\n다시 시도해주세요!`,
        );
      });
  };

  // 이메일 인증확인
  const authEmail = () => {
    dispatch(emailAuth({email: email, authToken: certification}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setIsCertificate(true);
          return Alert.alert('인증', '인증성공');
        }
        setIsCertificate(false);
        return Alert.alert('인증실패', '인증번호가 일치하지않습니다.');
      })
      .catch(err => {
        setIsCertificate(false);
        return Alert.alert('인증실패', '인증번호가 일치하지않습니다.');
      });
  };

  const checkNicknameRequest = useCallback(() => {
    dispatch(checkNickname({nickname: nickName}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setIsNickname(true);
          return Alert.alert('알림', '사용할 수 있는 닉네임입니다.');
        }
        setIsNickname(false);
        return Alert.alert('알림', '중복된 닉네임이 있습니다.');
      })
      .catch(err => {
        setIsNickname(false);
        return Alert.alert('알림', '중복된 닉네임이 있습니다.');
      });
  }, [nickName]);

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
    if (!check) {
      return Alert.alert('알림', '생년월일을 입력해주세요.');
    }
    if (!checkEmailValidation(email)) {
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
    if (!nickName || !isNickname) {
      return Alert.alert('알림', '닉네임 중복확인을 해주세요.');
    }

    dispatch(
      signUp({
        email,
        password,
        name,
        birth: selectedDate,
        phoneNumber,
        selectedCity: selectedCity ? selectedCity : '서울특별시',
        selectedCity2: selectedCity2 ? selectedCity2 : null,
        nickName,
      }),
    )
      .then(async res => {
        if (res.meta.requestStatus === 'fulfilled') {
          Alert.alert('알림', '회원가입되었습니다.');
          await AsyncStorage.setItem('token', res.payload.token);
        }
      })
      .catch(err => {
        console.log('SIGNUP ERR ===> ', err);
      });
  }, [
    email,
    checkEmail,
    certification,
    password,
    passwordCheck,
    name,
    nickName,
    phoneNumber,
    selectedCity,
    selectedCity2,
    check,
    dispatch,
    selectedDate,
    disabledEmail,
    isCertificate,
  ]);

  console.log(canGoNext);
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
    <DismissKeyboardView style={styles.wrapper}>
      <ScrollView>
        <AppTextBold style={styles.title}>회원가입</AppTextBold>
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
          {checkEmail !== 1 && (
            <Pressable
              style={
                disabledEmail ? styles.checkEmailActive : styles.checkEmail
              }
              onPress={pressCertificationButton}
              disabled={!disabledEmail || checkEmail === 1}>
              <AppText style={styles.checkEmailText}>중복확인</AppText>
            </Pressable>
          )}
          {checkEmail === 1 && (
            <Pressable
              style={
                checkEmail === 1 ? styles.checkEmailActive : styles.checkEmail
              }
              onPress={rsquestEmail}
              disabled={!(checkEmail === 1)}>
              <AppText style={styles.checkEmailText}>인증</AppText>
            </Pressable>
          )}
        </View>
        <View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.emailInputText}
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
            <Pressable
              style={authmail ? styles.checkEmailActive : styles.checkEmail}
              onPress={authEmail}
              disabled={!authmail}>
              <AppText style={styles.checkEmailText}>인증확인</AppText>
            </Pressable>
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
          <View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.emailInputText}
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
              <Pressable
                style={nickName ? styles.checkEmailActive : styles.checkEmail}
                onPress={checkNicknameRequest}
                disabled={!nickName}>
                <AppText style={styles.checkEmailText}>중복확인</AppText>
              </Pressable>
            </View>
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
          <DatePicker
            setCheck={setCheck}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <View style={styles.location}>
            <AppText style={styles.locationText}>
              실제 거주지의 주소를 선택해주세요
            </AppText>
          </View>
          <View style={styles.addressSt}>
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
            disabled={!canGoNext}
            onPress={onSubmit}>
            <AppText style={styles.registerButtonText}>가입하기</AppText>
          </Pressable>
        </View>
      </ScrollView>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  addressSt: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  authinputText: {
    fontFamily: 'NanumBarunGothic',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c5c5',
    width: 200,
    fontSize: 12,
  },
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  title: {
    marginTop: 40,
    marginBottom: 10,
    color: '#57d696',
    fontSize: 25,
  },
  emailInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailInputText: {
    fontFamily: 'NanumBarunGothic',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c5c5',
    fontSize: 12,
    flex: 0.7,
  },
  checkEmail: {
    backgroundColor: 'rgba(87, 214, 150, 0.5)',
    borderRadius: 30,
    marginTop: 10,
    flex: 0.3,
    justifyContent: 'center',
  },
  checkEmailActive: {
    backgroundColor: '#57d696',
    borderRadius: 30,
    marginTop: 10,
    flex: 0.3,
    justifyContent: 'center',
  },
  checkEmailText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  inputText: {
    fontFamily: 'NanumBarunGothic',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c5c5',
    width: '100%',
    fontSize: 12,
  },
  buttonZone: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: 'rgba(87, 214, 150, 0.5)',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginBottom: 40,
    width: '100%',
  },
  registerButtonActive: {
    backgroundColor: '#57d696',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginBottom: 40,
    width: '100%',
  },
  registerButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  location: {
    marginTop: 30,
  },
  locationText: {
    fontSize: 12,
    color: 'black',
  },
});

export default SignUp;
