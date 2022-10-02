import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import {LoggedInParamList} from '../../../../AppInner';
import AppText from '../../../components/AppText';
import AppTextBold from '../../../components/AppTextBold';
import {userChange} from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';

// navigation을 사용하기 위해 type 설정
type PhoneNumberChangeFormScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'PhoneNumberChangeForm'
>;

function PhoneNumberChangeForm({
  navigation,
  route,
}: PhoneNumberChangeFormScreenProps) {
  const dispatch = useAppDispatch();
  // 사용자 휴대폰번호를 저장할 변수, route에 값이 있을 경우 기존에 존재하는 값을 가져옴
  const [phone, setPhoneNumber] = useState(
    route.params?.user.phone ? route.params?.user.phone : '',
  );
  const phoneNumberRef = useRef<TextInput | null>(null); // 사용자 휴대폰번호 input의 값 가져오기

  // 사용자 휴대폰번호 input값 변경 시 phoneNumber 변수에 값 변경
  const onChangPhoneNumber = useCallback((text: string) => {
    setPhoneNumber(text.trim());
  }, []);

  // 전화번호 변경 버튼을 눌렀을 때 유효성 검사
  const onSubmit = useCallback(() => {
    if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/.test(phone)) {
      return Alert.alert(
        '알림',
        '숫자, -을 포함해 휴대전화 형식에 맞게 입력해주세요.',
      );
    }
    if (route.params?.user.phone === phone) {
      return Alert.alert(
        '알림',
        '기존과 동일한 전화번호로 변경할 수 없습니다.',
      );
    }
    dispatch(
      userChange({
        user: {...route.params?.user, phone: phone},
      }),
    ).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        route.params?.setUser({
          ...route.params?.user,
          phone: phone,
        });
      }
    });

    navigation.navigate('MyPage');
    return console.log('알림', '전화번호 변경에 성공하였습니다. ');
  }, [navigation, phone, route.params]);
  const canGoNext = phone; // 버튼 disabled 확인할 변수
  return (
    <View style={styles.backColor}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangPhoneNumber}
            placeholder="휴대폰 번호를 입력해주세요 ex) 010-1234-5678"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            autoComplete="tel"
            textContentType="telephoneNumber"
            value={phone}
            returnKeyType="send"
            clearButtonMode="while-editing"
            ref={phoneNumberRef}
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
                  styles.phoneNumberChangeButton,
                  styles.phoneNumberChangeButtonActive,
                )
              : styles.phoneNumberChangeButton
          }>
          <AppTextBold style={styles.phoneNumberChangeButtonText}>
            전화번호 변경
          </AppTextBold>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backColor: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputView: {
    marginVertical: 10,
  },
  input: {
    fontFamily: 'NanumBarunGothic',
    borderBottomWidth: 1,
    color: 'black',
  },
  phoneNumberChangeButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  phoneNumberChangeButtonActive: {
    backgroundColor: '#57d696',
  },
  phoneNumberChangeButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default PhoneNumberChangeForm;
