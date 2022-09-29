import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {LoggedInParamList} from '../../../../AppInner';
import DismissKeyboardView from '../../../components/DismissKeyboardView';
import {passwordChange} from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';

// navigation을 사용하기 위해 type 설정
type PasswordChangeScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'PasswordChange'
>;

function PasswordChange({navigation}: PasswordChangeScreenProps) {
  const [password, setPassword] = useState(''); // 기존 비밀번호 저장할 변수
  const [password1, setPassword1] = useState(''); // 새 비밀번호 저장할 변수
  const [password2, setPassword2] = useState(''); // 새 비밀번호 확인을 저장할 변수

  const passwordRef = useRef<TextInput | null>(null); // 기존 비밀번호 input의 값 가져오기
  const password1Ref = useRef<TextInput | null>(null); // 새 비밀번호 input의 값 가져오기
  const password2Ref = useRef<TextInput | null>(null); // 새 비밀번호 확인 input의 값 가져오기

  const dispatch = useAppDispatch();

  // 비밀번호 input 변경 시 password에 저장
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  // 비밀번호 input 변경 시 password1에 저장
  const onChangePassword1 = useCallback((text: string) => {
    setPassword1(text.trim());
  }, []);

  // 비밀번호 확인 input 변경 시 password2에 저장
  const onChangePassword2 = useCallback((text: string) => {
    setPassword2(text.trim());
  }, []);

  // 비밀번호 유효성 검사 함수
  const checkPassword = useCallback((text: string) => {
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(text)) {
      return false;
    }
    return true;
  }, []);

  // 비밀번호 찾기 버튼 클릭 시 유효성 검사
  const onSubmit = useCallback(() => {
    if (!password || !password.trim()) {
      return Alert.alert('알림', '기존 비밀번호를 입력해주세요.');
    }
    if (!password1 || !password1.trim()) {
      return Alert.alert('알림', '새 비밀번호를 입력해주세요.');
    }
    if (!password2 || !password2.trim()) {
      return Alert.alert('알림', '비밀번호 확인을 입력해주세요.');
    }
    if (password1 !== password2) {
      return Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
    }
    if (password === password1) {
      return Alert.alert(
        '알림',
        '기존 비밀번호와 동일한 비밀번호로 변경할 수 없습니다.',
      );
    }
    if (!checkPassword(password1)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }

    dispatch(passwordChange({password: password2}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigation.navigate('UserInfoChange');
          return Alert.alert('알림', '비밀번호가 재설정되었습니다.');
        }
        return Alert.alert('알림', '비밀번호 재설정에 실패하였습니다.');
      })
      .catch(err => {
        console.log(err);
        return Alert.alert('알림', '비밀번호 재설정에 실패하였습니다.');
      });
  }, [password, password1, password2, checkPassword, navigation]);

  const canGoNext = password && password1 && password2; // 버튼 disabled 확인할 변수

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>현재 비밀번호</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            placeholder="현재비밀번호를 입력해주세요"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            autoComplete="password"
            textContentType="password"
            secureTextEntry
            value={password}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={passwordRef}
            onSubmitEditing={() => password1Ref.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>새 비밀번호</Text>
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
          <Text style={styles.inputLabel}>새 비밀번호 확인</Text>
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
        <Pressable
          disabled={!canGoNext}
          onPress={onSubmit}
          style={
            canGoNext
              ? StyleSheet.compose(
                  styles.changePasswordButton,
                  styles.changePasswordButtonActive,
                )
              : styles.changePasswordButton
          }>
          <Text style={styles.changePasswordButtonText}>비밀번호 변경</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  inputView: {
    marginVertical: 20,
  },
  inputLabel: {
    fontWeight: '700',
    color: 'black',
  },
  input: {
    borderBottomWidth: 1,
    color: 'black',
    paddingLeft: 0,
  },
  changePasswordButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  changePasswordButtonActive: {
    backgroundColor: 'blue',
  },
  changePasswordButtonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default PasswordChange;
