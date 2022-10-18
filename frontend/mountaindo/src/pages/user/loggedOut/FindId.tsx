import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {RootStackParamList} from '../../../../AppInner';
import DatePicker from '../../../components/user/DatePicker';
import DismissKeyboardView from '../../../components/DismissKeyboardView';
import {useAppDispatch} from '../../../store';
import {findEmail} from '../../../slices/userSlice/user';
import AppTextBold from '../../../components/AppTextBold';
import AppText from '../../../components/AppText';

// navigation을 사용하기 위해 type 설정
type FindIdScreenProps = NativeStackScreenProps<RootStackParamList, 'FindId'>;

function FindId({navigation}: FindIdScreenProps) {
  const [name, setName] = useState(''); // 사용자 이름 저장할 변수
  const [selectedDate, setSelectedDate] = useState(''); // 선택 날짜를 문자열 형태로 변경하여 저장할 변수
  const [phone, setPhone] = useState(''); // 사용자 휴대폰번호를 저장할 변수

  const [check, setCheck] = useState(0); // 달력에 날짜를 선택했는지 확인할 변수

  const nameRef = useRef<TextInput | null>(null); // 사용자 이름 input의 값 가져오기
  const phoneRef = useRef<TextInput | null>(null); // 사용자 휴대폰번호 input의 값 가져오기

  const dispatch = useAppDispatch();

  // 사용자 이름 input값 변경 시 name 변수에 값 변경
  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);

  // 사용자 휴대폰번호 input값 변경 시 phone 변수에 값 변경
  const onChangPhone = useCallback((text: string) => {
    setPhone(text.trim());
  }, []);

  // 아아디 찾기 버튼을 눌렀을 때 유효성 검사
  const onSubmit = useCallback(() => {
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!check) {
      return Alert.alert('알림', '생년월일을 입력해주세요.');
    }
    if (!phone || !phone.trim()) {
      return Alert.alert('알림', '휴대폰 번호를 입력해주세요.');
    }
    if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/.test(phone)) {
      return Alert.alert(
        '알림',
        '숫자, -을 포함해 휴대전화 형식에 맞게 입력해주세요.',
      );
    }
    // 아이디 찾기 요청
    dispatch(findEmail({name, phone, birth: selectedDate}))
      .then(res => {
        if (res.payload?.email) {
          Alert.alert(
            '아이디 찾기 성공',
            `${res.payload.email} \n로그인 페이지로 이동하시겠습니까?`,
            [
              {
                text: '네',
                onPress: () => {
                  navigation.navigate('SignIn');
                },
              },
              {
                text: '아니오',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ],
          );
        } else {
          Alert.alert(
            '아이디 찾기',
            '아이디 찾기에 실패했습니다. 다시 시도해주세요!',
          );
        }
      })
      .catch(err => {
        Alert.alert(
          '아이디 찾기',
          '아이디 찾기에 실패했습니다. 다시 시도해주세요!',
        );
      });
  }, [name, phone, check]);

  const canGoNext = name && phone && !!check; // 버튼 disabled 확인할 변수
  return (
    <DismissKeyboardView style={styles.container}>
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
          <DatePicker
            setCheck={setCheck}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangPhone}
            placeholder="휴대폰 번호를 입력해주세요 ex) 010-1234-5678"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            autoComplete="tel"
            textContentType="telephoneNumber"
            value={phone}
            returnKeyType="send"
            clearButtonMode="while-editing"
            ref={phoneRef}
            onSubmitEditing={onSubmit}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.findPasswordButton}>
          <Pressable onPress={() => navigation.push('FindPassword')}>
            <AppTextBold style={styles.findPasswordText}>
              비밀번호 찾기
            </AppTextBold>
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
            <AppTextBold style={styles.buttonText}>아이디 찾기</AppTextBold>
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginTop: 30,
  },
  inputView: {
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    fontFamily: 'NanumBarunGothic',
    fontSize: 12,
  },
  findPasswordButton: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  findIdButton: {
    backgroundColor: 'rgba(87, 214, 150, 0.5)',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 30,
  },
  findIdButtonActive: {
    backgroundColor: '#57d696',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  findPasswordText: {
    fontSize: 12,
  },
});

export default FindId;
