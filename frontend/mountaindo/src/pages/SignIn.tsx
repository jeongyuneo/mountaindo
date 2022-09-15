import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

function SignIn({}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  useEffect(() => {
    if (email.length == 0) {
      setEmailCheck(' ');
    } else if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return setEmailCheck('올바른 이메일 주소가 아닙니다.');
    } else {
      setEmailCheck('');
    }
  }, [email]);

  const goNext = email && password;
  return (
    <View style={styles.container}>
      <View style={styles.titleSettings}>
        <View>
          <Text style={styles.mountainTitle}>MountainDo</Text>
          <Text style={styles.mountainText}>건강한 삶의 친구!</Text>
          <Text style={styles.mountainText}>
            등산로 추천으로 재밌는 코스를 즐겨보세요!
          </Text>
        </View>
      </View>

      <View style={styles.containerSession}>
        <View>
          <View style={styles.textPadding}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.textInput}
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
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={styles.emailInfoCheck}>
            <Text style={styles.emailInfoText}>{emailCheck}</Text>
          </View>

          <View style={styles.textPadding}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.textInput}
                placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
                placeholderTextColor="#666"
                importantForAutofill="yes"
                onChangeText={onChangePassword}
                value={password}
                autoComplete="password"
                textContentType="password"
                secureTextEntry
                returnKeyType="send"
                clearButtonMode="while-editing"
                ref={passwordRef}
                onSubmitEditing={onSubmit}
              />
            </KeyboardAvoidingView>
          </View>
        </View>

        <View style={styles.userInfoCreate}>
          <Text style={styles.userInfoText}>회원 가입</Text>
          <Text style={styles.userInfoText}>|</Text>
          <Text style={styles.userInfoText}>아이디 찾기</Text>
          <Text style={styles.userInfoText}>|</Text>
          <Text style={styles.userInfoText}>비밀 번호 찾기</Text>
        </View>

        <View style={styles.buttonZone}>
          <Pressable
            style={
              goNext && emailCheck.length == 0
                ? StyleSheet.compose(
                    styles.loginButton,
                    styles.loginButtonActive,
                  )
                : styles.loginButton
            }
            disabled={!goNext}
            onPress={onSubmit}>
            <Text style={styles.loginText}>로그인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSession: {
    flex: 2,
  },
  titleSettings: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 50,
  },
  mountainTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  mountainText: {
    color: 'black',
    fontSize: 14,
  },
  textPadding: {
    paddingHorizontal: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontFamily: 'Campton-Bold',
    fontWeight: 'normal',
  },
  userInfoCreate: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  userInfoText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emailInfoCheck: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 3,
  },
  emailInfoText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'red',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 140,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  buttonZone: {
    alignItems: 'center',
    marginTop: 40,
  },
  loginText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SignIn;
